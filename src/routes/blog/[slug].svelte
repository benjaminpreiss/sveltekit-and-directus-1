<script context="module">
    import {getAccessToken, getPageItem} from '$lib/loadHelper'
	import HttpError from '$lib/HttpError'
	export async function load({ page, fetch, session, context }) {
        const pageId = parseInt(page.params.slug)
        let tokenResult;
		let pageItemResult;
		try {
			tokenResult = await getAccessToken(fetch)
			pageItemResult = await getPageItem(fetch, tokenResult.data["access_token"], pageId)
			/* If successful, Pass props object to page. 
			*/
			return {
				props: {
					pageItemResult: pageItemResult
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
    export let pageItemResult;
</script>

<h2>{pageItemResult.data.title}</h2>
<div>{@html pageItemResult.data.text}</div>