import {React, BrowserRouter as Router, Switch, Route, withRouter, Suspense, HelmetProvider,
    useSelector, setTranslations, setDefaultLanguage, useEffect, Sentry
} from 'libraries';
import {languageSelector} from "modules";
import {
    homepageRoute, customerRoute, productRoute, categoryRoute, brandRoute, tradeInRoute, promotionRoute, orderRoute,
    dashboardRoute, helpRoute
} from 'routes';
import {getCarts, headWishlistProduct} from "services";
import id from "./locales/indonesia/id.json";
import en from "./locales/english/en.json";

import LoadingBarMolecule from 'components/molecules/LoadingBarMolecule';

const BaseContainer = React.lazy(() => import('containers/BaseContainer'));

const App = () => {

  const selector = useSelector(languageSelector);
  const acceess = localStorage.getItem('access');

  useEffect(() => {
      setTranslations({id, en});
      if (acceess !== null) {
          const payload = {
              headers: {
                  'Authorization': acceess,
                  'Cache-Control': 'no-cache'
              },
          };
          getCarts(payload).then(response => {
              headWishlistProduct(payload);
          });
      };
  }, [acceess]);

  setDefaultLanguage(selector.locale);


  return (
      <Suspense fallback={<LoadingBarMolecule />}>
          <HelmetProvider>
              <Router>
                  <Switch>
                      <BaseContainer>
                          {homepageRoute.map(routeHomepage => <Route key={routeHomepage.name} exact {...routeHomepage} />)}
                          {dashboardRoute.map(dashboardRoute => <Route key={dashboardRoute.name} exact {...dashboardRoute} />)}
                          {productRoute.map(productRoute => <Route key={productRoute.name} exact {...productRoute} />)}
                          {orderRoute.map(orderRoute => <Route key={orderRoute.name} exact {...orderRoute} />)}
                          {tradeInRoute.map(tradeInRoute => <Route key={tradeInRoute.name} exact {...tradeInRoute} />)}
                          {promotionRoute.map(promotionRoute => <Route key={promotionRoute.name} exact {...promotionRoute} />)}
                          {customerRoute.map(routeCustomer => <Route key={routeCustomer.name} exact {...routeCustomer} />)}
                          {categoryRoute.map(categoryRoute => <Route key={categoryRoute.name} exact {...categoryRoute} />)}
                          {brandRoute.map(brandRoute => <Route key={brandRoute.name} exact {...brandRoute} />)}
                          {helpRoute.map(helpRoute => <Route key={helpRoute.name} exact {...helpRoute} />)}
                      </BaseContainer>
                  </Switch>
              </Router>
          </HelmetProvider>
      </Suspense>
  );
};

export default withRouter(Sentry.withProfiler(App));