import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonModal, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { alert, create } from 'ionicons/icons';

interface ShopDetailProps {
	shop?: any;
	isOpen: boolean;
	onWillDismiss: () => void;
};

const ShopDetail: React.FC<ShopDetailProps> = (props) => {
	const [present] = useIonToast();
	const [shop, setShop] = useState(props.shop);
	const [loading, setLoading] = useState(true);

	const modal = useRef<HTMLIonModalElement>(null);
	const inputName = useRef<HTMLIonInputElement>(null);

	useEffect(() => {
		setShop(props.shop);
	}, [props.shop]);

	function error(error: any) {
		present({
			message: error.response.data.message,
			duration: 1500,
			icon: alert
		});
	}

	function create() {
		setLoading(true);

		axios.post('https://arquitectura-web.nyva.com.ar/api/shops', {
			name: inputName.current?.value
		}).then(response => {
			modal.current?.dismiss();
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function update() {
		setLoading(true);

		axios.put('https://arquitectura-web.nyva.com.ar/api/shops/' + shop.id, {
			name: inputName.current?.value
		}).then(response => {
			modal.current?.dismiss();
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function save() {
		if (shop) {
			update();
		} else {
			create();
		}
	}

	return (
		<IonModal ref={modal} isOpen={props.isOpen} onWillDismiss={props.onWillDismiss}>
			<IonHeader>
				<IonToolbar>
					<IonButtons slot="start">
						<IonButton onClick={() => modal.current?.dismiss()}>Cancelar</IonButton>
					</IonButtons>
					<IonTitle>Tienda</IonTitle>
					<IonButtons slot="end">
						<IonButton strong={true} onClick={() => save()}>Guardar</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent className="ion-padding">
				<IonItem>
					<IonInput label="Nombre" labelPlacement="stacked" ref={inputName} type="text" placeholder="Nombre de la tienda" value={shop?.name} />
				</IonItem>
			</IonContent>
		</IonModal>
	);
};

export default ShopDetail;
