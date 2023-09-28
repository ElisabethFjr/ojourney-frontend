// import React from 'react';
// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'row',
//     backgroundColor: '#E4E4E4',
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

// // Create Document Component
// const PdfFile = ({ data }) => (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text>Vos informations</Text>
//           <Text>Votre identifiant : {data.id}</Text>
//           <Text>Votre Nom : {data.lastname}</Text>
//           <Text>Votre Prénom : {data.firstname}</Text>
//           <Text>Votre email : {data.email}</Text>
//           <Text>Votre mot de passe : {data.password}</Text>
//         </View>
//         <View style={styles.section}>
//           <Text>Vos voyages</Text>
//           { data.trips.length > 0 ? (
//             data.trips.forEach(trip) => {
//             <Text>Identifiant du voyage : {trip.id}</Text>
//             <Text>Date de départ du voyage : {trip.date_start}</Text>
//             <Text>Date de fin du voyage : {trip.date_end}</Text>
//             <Text>Localisation du voyage : {trip.localisation}</Text>
//             <Text>Description du voyage : {trip.description}</Text>
//             <Text>URL de l'image du voyage : {trip.url_image}</Text>
//             }
//             ) : (
//               <Text>Vous n'avez pas de projet de voyage en cours</Text>
//             )
//           }
//         </View>
//       </Page>
//     </Document>
// );
