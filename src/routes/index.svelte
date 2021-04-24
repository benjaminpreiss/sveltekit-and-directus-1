<script context="module">
	import {getAccessToken, getPageItems} from '$lib/loadHelper'
	import HttpError from '$lib/HttpError'
	export async function load({ page, fetch, session, context }) {
		let tokenResult;
		let pageItemsResult;
		try {
			tokenResult = await getAccessToken(fetch)
			pageItemsResult = await getPageItems(fetch, tokenResult.data["access_token"])
			/* If successful, Pass props object to page. 
			*/
			return {
				props: {
					pageItemsResult: pageItemsResult,
					tokenResult: tokenResult
				}
			}
		} catch (error) {
			/* If unsuccessful, pass an object containing error and status to page.
			*/
			return {
				/* Since Error does not contain the status, we use HttpError.
				*/
				status: error instanceof HttpError ? error.response.status : 500,
				error: error
			}
		}
	}
</script>

<script>
	/* Reference tokenResult prop returned above.
	*/
	export let tokenResult;
	export let pageItemsResult;
	console.log(tokenResult);
	console.log(pageItemsResult);
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Our new index page</h1>

<nav>
	{#each pageItemsResult.data as item}
		<a href={"/blog/" + item.id.toString()}>{item.title}</a>
	{/each}
</nav>