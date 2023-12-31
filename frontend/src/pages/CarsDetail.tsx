import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLoading, IonModal, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { alert, create } from 'ionicons/icons';
import { useParams } from 'react-router';

interface CarDetailProps {
	car?: any;
	isOpen: boolean;
	onWillDismiss: () => void;
};

const CarDetail: React.FC<CarDetailProps> = (props) => {
	const { shopID } = useParams<any>();

	const [present] = useIonToast();
	const [car, setCar] = useState(props.car);
	const [loading, setLoading] = useState(false);

	const modal = useRef<HTMLIonModalElement>(null);
	const inputType = useRef<HTMLIonInputElement>(null);
	const inputYear = useRef<HTMLIonInputElement>(null);
	const inputKM = useRef<HTMLIonInputElement>(null);

	useEffect(() => {
		setCar(props.car);
	}, [props.car]);

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

		axios.post(`https://arquitectura-web.nyva.com.ar/api/shops/${shopID}/cars`, {
			type: inputType.current?.value,
			year: inputYear.current?.value,
			km: inputKM.current?.value
		}).then(response => {
			modal.current?.dismiss();
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function update() {
		if (loading) return;
		setLoading(true);

		axios.put(`https://arquitectura-web.nyva.com.ar/api/shops/${shopID}/cars/${car.id}`, {
			type: inputType.current?.value,
			year: inputYear.current?.value,
			km: inputKM.current?.value
		}).then(response => {
			modal.current?.dismiss();
		}).catch(error).finally(() => {
			setLoading(false);
		});
	}

	function save() {
		if (car) {
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
						<IonTitle>Auto</IonTitle>
						<IonButtons slot="end">
							<IonButton strong={true} onClick={() => save()}>Guardar</IonButton>
						</IonButtons>
					</IonToolbar>
				</IonHeader>
					<IonContent className="ion-padding">
						<IonItem>
							<IonInput label="Tipo" labelPlacement="stacked" ref={inputType} type="text" placeholder="Tipo de auto" value={car?.type} />
						</IonItem>
						<IonItem>
							<IonInput label="Año" labelPlacement="stacked" ref={inputYear} type="number" placeholder="Año del auto" value={car?.year} />
						</IonItem>
						<IonItem>
							<IonInput label="KM" labelPlacement="stacked" ref={inputKM} type="number" placeholder="KM del auto" value={car?.km} />
						</IonItem>
					</IonContent>
				</>
			}
		</IonModal>
	);
};

export default CarDetail;
