import "../styles/globals.css";
import Navbar from "../components/navbar";
import { getNavigation } from "../lib/contentful";

function MyApp({ Component, pageProps, navigation }) {
  return (
    <>
      <Navbar items={navigation} />
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async () => {
  const nav = await getNavigation();
  const items = nav?.fields?.items
    ? JSON.parse(nav.fields.items)
    : [];

  return {
    navigation: items,
  };
};

export default MyApp;
