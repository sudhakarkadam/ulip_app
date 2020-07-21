# react-native-monorepo ![CI](https://github.com/samvet/ULIP-APP/workflows/CI/badge.svg)

### running the app

```
react-native run-android --variant=<prod|preprod><Debug|Release>
```

## internationalisation

- if you have a component that needs to render a `Text` node
- if you edit the strings in json please run `node translation-types.js`

```tsx
import { TranslationText } from 'src/components/InternationalisationProvider';

// any where inside render or component

<TranslationText id="mobile.number">
```

- get the from en.json stored in `i18n` folder

- if you can't use this component and
  need the translated string use the `translate` function added in the context

```tsx
import { i18n } from "src/components/InternationalisationProvider";

// inside the component

const { translate } = useContext(i18n);

translate("mobile.number");
translate("otp.verified")({ phoneNumber: 123 });
```
