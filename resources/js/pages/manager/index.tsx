import ManagerLayout from '@/layouts/manager-layout';
import { useTranslation } from "react-i18next";

export default function App() {
    const { t } = useTranslation();
    const { i18n } = useTranslation()

    return (
        <ManagerLayout>
            <h1>{t('welcome')}</h1>
            <button>{t('buy_gold')}</button>
            <button onClick={() => i18n.changeLanguage('fa')}>FA</button>
            <button onClick={() => i18n.changeLanguage('en')}>EN</button>


        </ManagerLayout>
    );
}
