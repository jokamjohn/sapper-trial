<script context="module">
    export function preload(page, session) {
        console.log('session', session)
    }
</script>

<script>
    const { session } = stores();
    import { stores } from '@sapper/app';
</script>

<p>Session {session.token}</p>