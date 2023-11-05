import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import UserDetail from './UsersDetail';
import { alert } from 'ionicons/icons';

const Users: React.FC = () => {
	const [present] = useIonToast();
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		list();
	}, []);

	function error(error: any) {
		present({
			message: error.response.data.message,
			duration: 1500,
			icon: alert
		});
	}

	function list() {
		setLoading(true);

		axios.get('https://arquitectura-web.nyva.com.ar/api/users').then(response => {
			setUsers(response.data);
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function remove(id: number) {
		setLoading(true);

		axios.delete('https://arquitectura-web.nyva.com.ar/api/users/' + id).then(response => {
			list();
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function edit(user: any) {
		setUser(user);
		setIsOpen(true);
	}

	function create() {
		setUser(null);
		setIsOpen(true);
	}

	function onWillDismiss() {
		setIsOpen(false);
		list();
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Usuarios</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => create()}>Nuevo usuario</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<UserDetail user={user} isOpen={isOpen} onWillDismiss={onWillDismiss} />
				{loading ? <IonLoading message="Cargando" /> : users.length === 0
					? <IonTitle>No hay usuarios</IonTitle>
					: users.map((user: any, i) => (
						<IonCard key={i}>
							<IonCardHeader>
								<IonCardTitle>{user.username}</IonCardTitle>
								<IonCardSubtitle>{user.name}</IonCardSubtitle>
								<IonCardSubtitle>{user.surname}</IonCardSubtitle>
							</IonCardHeader>
							<IonCardContent>
								<IonButtons slot="end">
									<IonButton expand="block" onClick={() => edit(user)}>Editar</IonButton>
									<IonButton expand="block" onClick={() => remove(user.id)}>Eliminar</IonButton>
								</IonButtons>
							</IonCardContent>
						</IonCard>
					))}
			</IonContent>
		</IonPage>
	);
};

export default Users;
