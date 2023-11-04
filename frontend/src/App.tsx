import { Redirect, Route } from 'react-router-dom';
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, people, storefront, triangle } from 'ionicons/icons';
import Shops from './pages/Shops';
import Users from './pages/Users';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonTabs>
				<IonRouterOutlet>
					<Route exact path="/shops">
						<Shops />
					</Route>
					<Route exact path="/users">
						<Users />
					</Route>
					<Route exact path="/">
						<Redirect to="/shops" />
					</Route>
				</IonRouterOutlet>
				<IonTabBar slot="bottom">
					<IonTabButton tab="shops" href="/shops">
						<IonIcon aria-hidden="true" icon={storefront} />
						<IonLabel>Tiendas</IonLabel>
					</IonTabButton>
					<IonTabButton tab="users" href="/users">
						<IonIcon aria-hidden="true" icon={people} />
						<IonLabel>Usuarios</IonLabel>
					</IonTabButton>
				</IonTabBar>
			</IonTabs>
		</IonReactRouter>
	</IonApp>
);

export default App;
