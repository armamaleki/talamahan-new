import type { BreadcrumbItem } from '@/types';
import { edit as editAppearance } from '@/routes/appearance';
import { Head, router } from '@inertiajs/react';
import SettingsLayout from '@/layouts/settings/layout';
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import language from '@/routes/language';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];
export default function Language() {
    const { t } = useTranslation();
    const { i18n } = useTranslation()

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        router.post(language.change(), { lang });
    };
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Language settings" />
          <SettingsLayout>
              <div className="space-y-6">
                  <HeadingSmall
                      title="Language settings"
                      description="Update your account's Language settings"
                  />
                  <h1>{t('welcome')}</h1>
                  <button>{t('buy_gold')}</button>
                  <ButtonGroup>
                      <Button onClick={()=>changeLanguage('en')} >
                          انگلیسی
                      </Button>
                      <Button onClick={()=>changeLanguage('ar')} >
                          عربی
                      </Button>
                  </ButtonGroup>
              </div>
          </SettingsLayout>
      </AppLayout>
  );
}
