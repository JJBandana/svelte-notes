<script lang="ts">
	import type { PageData } from '../$types';

	let { data }: { data: PageData } = $props();
</script>

{#await data.note}
	Loading Note...
{:then note}
	<form action="?/updateNote" method="POST">
		<h3>Editing {note.title}</h3>
		<input type="text" name="title" id="title" placeholder="title" value={note.title} />
		<input
			type="text"
			name="description"
			id="description"
			placeholder="description"
			value={note.description}
		/>
		<button type="submit">Update Note</button>
	</form>
{:catch error}
	<p>error loading note: {error.message}</p>
{/await}
