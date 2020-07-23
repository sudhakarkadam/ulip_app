# react-native-monorepo ![CI](https://github.com/samvet/ULIP-APP/workflows/CI/badge.svg)

### running the app for the first time

```
react-native run-android --variant=<prod|preprod><Debug|Release>
```

### second runs onwards, if you don't have any native changes

```
yarn start
# optional start on a diff port
# yarn start --port=8088
```

### opening emulator without opening the monstrous Android Studio

```
# list if you don't know the name
# emulator -list-avds
emulator @<name of avd from above>

```

## internationalisation

- if you have a component that just needs to render a `Text` node

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
