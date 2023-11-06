import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonLoading, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import ShopDetail from './ShopsDetail';
import axios from 'axios';
import { alert } from 'ionicons/icons';

import shopImg from '../../resources/shop.png';

const Shops: React.FC = () => {
	const [present] = useIonToast();
	const [shop, setShop] = useState(null);
	const [shops, setShops] = useState([]);
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

		axios.get('https://arquitectura-web.nyva.com.ar/api/shops').then(response => {
			setShops(response.data);
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function remove(id: number) {
		setLoading(true);

		axios.delete('https://arquitectura-web.nyva.com.ar/api/shops/' + id).then(response => {
			list();
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function edit(shop: any) {
		setShop(shop);
		setIsOpen(true);
	}

	function create() {
		setShop(null);
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
					<IonTitle>Tiendas</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => create()}>Nueva tienda</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<ShopDetail shop={shop} isOpen={isOpen} onWillDismiss={onWillDismiss} />
				{loading ? <IonLoading message="Cargando" /> : shops.length === 0
					? <IonTitle>No hay tiendas</IonTitle>
					: shops.map((shop: any, i) => (
						<IonCard key={i}>
							<IonGrid>
								<IonRow>
									<IonCol size="20%">
										<img alt="Auto" src={shopImg} style={{
											width: "100%",
											maxHeight: "150px"
										}} />
									</IonCol>
									<IonCol>
										<IonCardHeader>
											<IonCardTitle>Nombre: {shop.name}</IonCardTitle>
										</IonCardHeader>
										<IonCardContent>
											<IonButtons slot="end">
												<IonButton expand="block" routerLink={'/shops/' + shop.id + '/cars'}>Autos</IonButton>
												<IonButton expand="block" onClick={() => edit(shop)}>Editar</IonButton>
												<IonButton expand="block" onClick={() => remove(shop.id)}>Eliminar</IonButton>
											</IonButtons>
										</IonCardContent>
									</IonCol>
								</IonRow>
							</IonGrid>
						</IonCard>
					))}
			</IonContent>
		</IonPage>
	);
};

export default Shops;
