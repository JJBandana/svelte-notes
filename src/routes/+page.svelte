<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let notes = $derived(data.notes);
</script>

<h1>NOTES</h1>

<form action="?/createNote" method="POST">
	<h3>New Note</h3>
	<input type="text" name="title" id="title" placeholder="title" />
	<input type="text" name="description" id="description" placeholder="description" />
	<button type="submit">Add Note</button>
</form>

{#each notes as note}
	<article>
		<h3>{note.title}</h3>
		<p>{note.description}</p>
		<form action="?/deleteNote&id={note.id}" method="POST">
			<button type="submit">Delete</button>
		</form>
		<a href="/{note.id}">Edit Note</a>
	</article>
{/each}
