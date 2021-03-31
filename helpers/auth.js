import Router from 'next/router';
import nextCookie from 'next-cookies';

export async function auth(ctx) {
	const { token } = await nextCookie(ctx);

	if (ctx.req && !token) {
		ctx.res.writeHead(302, { Location: '/' });
		ctx.res.end();
		return;
	}

	if (!token) {
		console.log(token);
		Router.push('/');
	}

	return token;
}
