// Import React-PDF/Renderer
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
// Import Interfaces
import { User } from '../../@types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    margin: 10,
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
interface PdfDisplayProps {
  data: User;
}

function PdfDisplay({ data }: PdfDisplayProps) {
  const allTrips = data.trips?.map((trip) => {
    return (
      <View key={trip.id} style={styles.section}>
        <Text>Identifiant du voyage : {trip.id}</Text>
        <Text>Date de départ : {trip.date_start}</Text>
        <Text>Date de retour: {trip.date_end}</Text>
        <Text>Localisation du voyage : {trip.localisation}</Text>
        <Text>Description du voyage : {trip.description}</Text>
        <Text>Url de l&apos;image du voyage : {trip.url_image}</Text>
        <Text>Message alternatif à l&apo;image : {trip.alt_image}</Text>
      </View>
    );
  });
  const allLinks = data.links?.map((link) => {
    return (
      <View key={link.id} style={styles.section}>
        <Text>Identifiant de la proposition : {link.id}</Text>
        <Text>Description de la proposition : {link.description}</Text>
        <Text>URL partagée: {link.url}</Text>
        <Text>Localisation de la proposition : {link.localisation}</Text>
        <Text>Titre de la proposition : {link.title}</Text>
        <Text>Url de l&apos;image de la proposition : {link.image}</Text>
        <Text>Message alternatif à l&apo;image : {link.alt_image}</Text>
      </View>
    );
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{`${data.firstname} ${data.lastname}`}</Text>
          <Text>Vos données personnelles : </Text>
          <Text>Votre identifiant : {data.id}</Text>
          <Text>Votre prénom : {data.firstname}</Text>
          <Text>Votre email : {data.email}</Text>
          <Text>
            Votre consentement concernant l&apos;utilisation de vos données dans
            un but commercial : {data.consent_commercial}
          </Text>
          <Text>
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
