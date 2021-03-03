import { Component } from 'react';
import { auth } from './auth';

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export const withAuthSync = WrappedComponent =>
	class extends Component {
		static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`;

		static async getInitialProps(ctx) {
			const token = auth(ctx);

			const componentProps =
				WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));

			return { ...componentProps, token };
		}

		constructor(props) {
			super(props);

			this.syncLogout = this.syncLogout.bind(this);
		}

		componentDidMount() {
			window.addEventListener('storage', this.syncLogout);
		}

		componentWillUnmount() {
			window.removeEventListener('storage', this.syncLogout);
			window.localStorage.removeItem('logout');
		}

		syncLogout(event) {
			if (event.key === 'logout') {
				console.log('logged out from storage!');
				Router.push('/login');
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};