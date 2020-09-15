<script>
    import { stores } from '@sapper/app';
    const { session } = stores();

    let email = '';
    let password = '';
    let token;
    let error;

    /**
     * Send login details to the /login.js server route
     * to handle the connection with the API.
     * @returns {Promise<void>}
     */
    async function handleLogin() {
        if (!email || !password) {
            error = 'Email or password are missing';
            return;
        }
        error = '';

        const response = await fetch('/login/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ email, password })
        });

        const res = await response.json();
        console.log(res)

        if (res.error) {
            error = res.error;
        } else {
            token = res.token;
            $session.token = res.token;
        }
    }
    
</script>

<form on:submit|preventDefault={handleLogin} method="post">
    <label for="email">
        Email:
        <input id="email" bind:value={email} type="email">
    </label>

    <label for="password">
        Password:
        <input id="password" bind:value={password} type="password">
    </label>

    <button type="submit">Login</button>
</form>

<p>email: {email} password: {password}</p>

{#if token}
    <p>Token: {token}</p>
{/if}

{#if error}
    <p>{error}</p>
{/if}