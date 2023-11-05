import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLoading, IonModal, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { alert, create } from 'ionicons/icons';

interface UserDetailProps {
	user?: any;
	isOpen: boolean;
	onWillDismiss: () => void;
};

const UserDetail: React.FC<UserDetailProps> = (props) => {
	const [present] = useIonToast();
	const [user, setUser] = useState(props.user);
	const [loading, setLoading] = useState(false);

	const modal = useRef<HTMLIonModalElement>(null);
	const inputUsername = useRef<HTMLIonInputElement>(null);
	const inputName = useRef<HTMLIonInputElement>(null);
	const inputSurname = useRef<HTMLIonInputElement>(null);
	const inputPassword = useRef<HTMLIonInputElement>(null);

	useEffect(() => {
		setUser(props.user);
	}, [props.user]);

	function error(error: any) {
		present({
			message: error.response.data.message,
			duration: 1500,
			icon: alert
		});
	}

	function create() {
		if (loading) return;
		setLoading(true);

		axios.post('https://arquitectura-web.nyva.com.ar/api/users', {
			username: inputUsername.current?.value,
			name: inputName.current?.value,
			surname: inputSurname.current?.value,
			password: inputPassword.current?.value
		}).then(response => {
			modal.current?.dismiss();
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function update() {
		if (loading) return;
		setLoading(true);

		axios.put('https://arquitectura-web.nyva.com.ar/api/users/' + user.id, {
			username: inputUsername.current?.value,
			name: inputName.current?.value,
			surname: inputSurname.current?.value,
			password: inputPassword.current?.value
		}).then(response => {
			modal.current?.dismiss();
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function save() {
		if (user) {
			update();
		} else {
			create();
		}
	}

	return (
		<IonModal ref={modal} isOpen={props.isOpen} onWillDismiss={props.onWillDismiss}>
			{loading ? <IonLoading message="Cargando" /> :
				<><IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonButton onClick={() => modal.current?.dismiss()}>Cancelar</IonButton>
						</IonButtons>
						<IonTitle>Usuario</IonTitle>
						<IonButtons slot="end">
							<IonButton strong={true} onClick={() => save()}>Guardar</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
					<IonContent className="ion-padding">
						<IonItem>
							<IonInput label="Usuario" labelPlacement="stacked" ref={inputUsername} type="text" placeholder="Usuario" value={user?.username} />
						</IonItem>
						<IonItem>
							<IonInput label="Nombre" labelPlacement="stacked" ref={inputName} type="text" placeholder="Nombre del usuario" value={user?.name} />
						</IonItem>
						<IonItem>
							<IonInput label="Apellido" labelPlacement="stacked" ref={inputSurname} type="text" placeholder="Apellido del usuario" value={user?.surname} />
						</IonItem>
						<IonItem>
							<IonInput label="Contraseña" labelPlacement="stacked" ref={inputPassword} type="password" placeholder="Password del usuario" />
						</IonItem>
					</IonContent>
				</>
			}
		</IonModal>
	);
};

export default UserDetail;
