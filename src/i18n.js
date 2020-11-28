import i18n from "i18next";
import { translation as LoginI18n } from "views/Login/i18n";
import { translation as DashboardI18n } from "views/Dashboard/i18n";
import { translation as UserProfileI18n } from "views/UserProfile/i18n";
import { translation as RegisterUserI18n } from "views/RegisterUser/i18n";
import { translation as ExchangeHistory18n } from "views/Exchange/i18n";

const rootI18n = {
    en: {
        "common.exchange": "Exchange Now",
        "common.create": "Create",
        "common.create.success": "Poof! Transaction had created!",
        "common.update": "Update",
        "common.update.success": "Poof! Record has been updated!",
        "common.search": "Search",
        "common.search.fail": "No result found",
        "common.back": "Back",
        "common.cancel": "Cancel",
        "common.confirm": "Confirm",
        "common.loading": "Loading...",
        "common.number": "No.",
        "dropdown.all": "All",
        "loading.message": "Exchange Rates is Loading ...",
        "dialog.check.detail": "Please check the details",
        "network.error": "Something wrong with the network!",
        "service.error": "Service Unavailable",
        "service.error.message": "Service unavailable now. Please try again later.",
        "verify.email": "Please verify your email address before login to Exchange Rates System.",
        "verify.resentEmail": "Resent Verification Email",
        "currency.aud": "AUD",
        "currency.myr": "MYR",
        "currency.sgd": "SGD",
        "currency.usd": "USD"
    }
};

i18n.init({
    resources: {
        en: {
            translations: Object.assign(
                {},
                rootI18n.en,
                LoginI18n.en,
                DashboardI18n.en,
                UserProfileI18n.en,
                RegisterUserI18n.en,
                ExchangeHistory18n.en
            )
        }
    },
    fallbackLng: "en",
    debug: true,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ","
    },
    react: {
        wait: true
    }
});

export default i18n;
