import { Trans } from 'react-i18next';

const T = ({ i18nKey }: { i18nKey: string }) => (
  <Trans
    i18nKey={i18nKey}
    components={{mark: <mark className="text-[var(--accent)] bg-transparent font-bold" />}}
  />
);

export default T;