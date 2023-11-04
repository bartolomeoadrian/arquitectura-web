import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';

const ShopDetail: React.FC = () => {
	const [shop, setShop] = useState(null);

	const modal = useRef<HTMLIonModalElement>(null);
	const inputName = useRef<HTMLIonInputElement>(null);

	useEffect(() => {

	}, []);

	function save() {
		console.log(1);
	}

	return (
		<IonModal ref={modal} trigger="open-shop">
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
					<IonInput label="Nombre" labelPlacement="stacked" ref={inputName} type="text" placeholder="Nombre de la tienda" />
				</IonItem>
			</IonContent>
		</IonModal>
	);
};

export default ShopDetail;
