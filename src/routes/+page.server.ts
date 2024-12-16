import { fail, type Actions } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		notes: await prisma.note.findMany()
	};
};

export const actions = {
	createNote: async ({ request }) => {
		const { title, description } = Object.fromEntries(await request.formData()) as {
			title: string;
			description: string;
		};

		try {
			await prisma.note.create({
				data: {
					title,
					description
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Could not create the note' });
		}

		return {
			status: 201
		};
	},
	deleteNote: async ({ url }) => {
		const id = url.searchParams.get('id');
		if (!id) return fail(400, { message: 'Invalid Request' });

		try {
			await prisma.note.delete({
				where: {
					id: Number(id)
				}
			});
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Something went wrong deleting your note' });
		}
		return {
			status: 200
		};
	}
} satisfies Actions;
