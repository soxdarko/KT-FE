import App from 'next/app';
import React from 'react';
import Head from 'next/head';

import './_app.scss';

class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<>
				<Head>
					<title>KlikTermin</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				<Component {...pageProps} />
			</>
		);
	}
}

export default MyApp;
