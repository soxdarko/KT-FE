import Router from 'next/router';
import nextCookie from 'next-cookies';

export async function auth(ctx) {
	const { token } = await nextCookie(ctx);

	if (ctx.req && !token) {
		console.log('error1');
		ctx.res.writeHead(302, { Location: '/' });
		ctx.res.end();
		return;
	}

	if (!token) {
		console.log('error2');
		Router.push('/');
	}
	console.log(token);
}
