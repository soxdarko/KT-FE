import Router from 'next/router';
import nextCookie from 'next-cookies';

export  function auth(ctx) {
	const { token } =  nextCookie(ctx);

	if (ctx.req && !token) {
		ctx.res.writeHead(302, { Location: '/' });
		return;
	}

	if (!token) {
		Router.push('/');
	}

	return token;
}
