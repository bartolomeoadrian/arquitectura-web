import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import CarDetail from './CarsDetail';
import axios from 'axios';
import { alert } from 'ionicons/icons';
import { useParams } from 'react-router';

const Cars: React.FC = () => {
	const { shopID } = useParams<any>();

	const [present] = useIonToast();
	const [car, setCar] = useState(null);
	const [cars, setCars] = useState([]);
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

		axios.get(`https://arquitectura-web.nyva.com.ar/api/shops/${shopID}/cars`).then(response => {
			setCars(response.data);
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function remove(id: number) {
		setLoading(true);

		axios.delete(`https://arquitectura-web.nyva.com.ar/api/shops/${shopID}/cars/${id}`).then(response => {
			list();
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function edit(car: any) {
		setCar(car);
		setIsOpen(true);
	}

	function create() {
		setCar(null);
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
					<IonTitle>Autos</IonTitle>
					<IonButtons slot="end">
						<IonButton onClick={() => create()}>Nuevo auto</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<CarDetail car={car} isOpen={isOpen} onWillDismiss={onWillDismiss} />
				{loading ? <IonLoading message="Cargando" /> : cars.length === 0
					? <IonTitle>No hay autos</IonTitle>
					: cars.map((car: any, i) => (
						<IonCard key={i}>
							<IonCardHeader>
								<IonCardTitle>{car.name}</IonCardTitle>
							</IonCardHeader>
							<IonCardContent>
								<IonButtons slot="end">
									<IonButton expand="block" onClick={() => edit(car)}>Editar</IonButton>
									<IonButton expand="block" onClick={() => remove(car.id)}>Eliminar</IonButton>
								</IonButtons>
							</IonCardContent>
						</IonCard>
					))}
			</IonContent>
		</IonPage>
	);
};

export default Cars;
