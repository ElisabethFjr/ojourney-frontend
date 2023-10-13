// Import React-PDF/Renderer
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
// Import Interfaces
import { User } from '../../@types';
// Import Logo
import logo from '../../assets/logo/logo.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    margin: 5,
    padding: 10,
  },
  section: {
    margin: 5,
    padding: 5,
    flexGrow: 1,
    fontSize: 16,
    color: '#1b3856',
    borderBottom: 'solid',
  },
  text: {
    fontSize: 12,
    textAlign: 'left',
    fontWeight: 'light',
    margin: 5,
  },
  headerImage: {
    width: 100,
    height: 50,
    alignSelf: 'center',
  },
});

interface PdfDisplayProps {
  data: User;
}

function PdfDisplay({ data }: PdfDisplayProps) {
  const allTrips = data.trips?.map((trip) => {
    return (
      <View key={trip.id} style={styles.section}>
        <Text style={styles.text}>Identifiant du voyage : {trip.id}</Text>
        <Text style={styles.text}>Date de départ : {trip.date_start}</Text>
        <Text style={styles.text}>Date de retour: {trip.date_end}</Text>
        <Text style={styles.text}>
          Localisation du voyage : {trip.localisation}
        </Text>
        <Text style={styles.text}>
          Description du voyage : {trip.description}
        </Text>
        <Text style={styles.text}>
          Url de l&apos;image du voyage : {trip.url_image}
        </Text>
        <Text style={styles.text}>
          Message alternatif à l&apo;image : {trip.alt_image}
        </Text>
      </View>
    );
  });
  const allLinks = data.links?.map((link) => {
    return (
      <View key={link.id} style={styles.section}>
        <Text style={styles.text}>
          Identifiant de la proposition : {link.id}
        </Text>
        <Text style={styles.text}>
          Description de la proposition : {link.description}
        </Text>
        <Text style={styles.text}>URL partagée: {link.url}</Text>
        <Text style={styles.text}>
          Localisation de la proposition : {link.localisation}
        </Text>
        <Text style={styles.text}>Titre de la proposition : {link.title}</Text>
        <Text style={styles.text}>
          Url de l&apos;image de la proposition : {link.image}
        </Text>
        <Text style={styles.text}>
          Message alternatif à l&apo;image : {link.alt_image}
        </Text>
      </View>
    );
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src={logo} style={styles.headerImage} />
        <View style={styles.section}>
          <Text>{`${data.firstname} ${data.lastname}`}</Text>
          <Text style={styles.section}> Vos données personnelles : </Text>
          <Text style={styles.text}>Votre identifiant : {data.id}</Text>
          <Text style={styles.text}>Votre prénom : {data.firstname}</Text>
          <Text style={styles.text}>Votre email : {data.email}</Text>
          <Text style={styles.text}>
            Votre consentement concernant l&apos;utilisation de vos données dans
            un but commercial : {data.consent_commercial}
          </Text>
          <Text style={styles.text}>
            Votre consentement concernant l&apos;envoi de la newsletter :{' '}
            {data.consent_newsletter}
          </Text>
        </View>
        <Text style={styles.section}>Vos projets de voyage :</Text>
        {allTrips}
        <Text style={styles.section}>Vos propositions publiées :</Text>
        {allLinks}
      </Page>
    </Document>
  );
}

export default PdfDisplay;
