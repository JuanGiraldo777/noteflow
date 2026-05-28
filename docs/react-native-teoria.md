# React Native — Teoría del proyecto NoteFlow

## 1. React Native vs app nativa

Una app nativa pura se escribe en el lenguaje propio del sistema operativo: Swift o Objective-C para iOS, Kotlin o Java para Android. El código habla directamente con el sistema operativo sin intermediarios, lo que le da el máximo rendimiento posible.

React Native funciona de forma distinta. El código se escribe en JavaScript y TypeScript, pero **no se ejecuta en un WebView** como haría una app web disfrazada de nativa. En su lugar, React Native mantiene dos hilos de ejecución separados:

- **JS thread**: donde corre tu código React, la lógica de negocio, los hooks y el estado.
- **UI thread (nativo)**: donde el sistema operativo renderiza los componentes reales.

Cuando escribes `<View>` o `<Text>` en React Native, no se genera HTML. React Native traduce esos componentes a vistas nativas reales del sistema operativo — `UIView` en iOS, `android.view.View` en Android. El resultado visual y táctil es indistinguible de una app nativa.

### La comunicación entre hilos

El JS thread y el UI thread se comunican a través de un puente (bridge). En la arquitectura clásica este puente era asíncrono y serializado, lo que podía causar cuellos de botella. La New Architecture (introducida en React Native 0.68+) reemplaza este puente por JSI (JavaScript Interface), una comunicación síncrona y directa que elimina la serialización.

**Consecuencia práctica:** si el JS thread se bloquea con cálculos pesados, la interfaz se congela aunque el componente no haya cambiado. Por eso en NoteFlow usamos FlashList en lugar de FlatList — FlashList gestiona mejor ese puente en listas largas, evitando pantallas en blanco al hacer scroll rápido.

### Diferencias reales con una app nativa pura

| Aspecto | App nativa pura | React Native |
|---|---|---|
| Lenguaje | Swift / Kotlin | TypeScript / JavaScript |
| Renderizado | Directo al SO | Via bridge/JSI al SO |
| Componentes | UIKit / Jetpack | Componentes RN → nativos |
| Rendimiento | Máximo | Muy cercano al nativo |
| Código compartido | 0% | ~90% entre iOS y Android |
| Curva de aprendizaje | Alta (dos lenguajes) | Media (un lenguaje) |

Para la mayoría de apps de productividad como NoteFlow, React Native ofrece un rendimiento más que suficiente con la ventaja de mantener un único código base para ambas plataformas.

---

## 2. El Metro bundler

Metro es el empaquetador (bundler) de JavaScript que usa React Native. Su función es similar a Webpack en el mundo web: toma todos los ficheros de tu proyecto (TypeScript, JSX, assets) y los transforma en un único bundle de JavaScript que puede ejecutar el dispositivo.

### Cómo funciona en desarrollo

Cuando ejecutas `npx expo start`, Metro arranca un servidor local en tu ordenador (por defecto en el puerto 8081). El dispositivo o emulador se conecta a ese servidor y descarga el bundle en tiempo real.

Cada vez que guardas un fichero, Metro detecta el cambio, recompila solo el módulo afectado (no todo el proyecto) y envía la actualización al dispositivo mediante **Fast Refresh**. Esto es lo que hace que los cambios aparezcan en pantalla en menos de un segundo sin perder el estado de la app.

### Por qué Metro y no otro bundler

Metro está optimizado específicamente para React Native. Gestiona correctamente las diferencias entre plataformas (ficheros `.ios.ts` vs `.android.ts`), resuelve los módulos nativos y maneja los assets (imágenes, fuentes) de forma que funcionen en iOS y Android simultáneamente.

---

## 3. Expo Go vs Development Build — por qué Expo Go no es suficiente en proyectos reales

### Qué es Expo Go

Expo Go es una app publicada en la App Store y Play Store que contiene un entorno de ejecución de React Native precompilado. Al escanear el QR de `npx expo start`, tu app se carga dentro de Expo Go sin necesidad de compilar nada.

**Ventajas:** arranque inmediato, sin Xcode, sin Android Studio, sin cables.

**Limitaciones críticas:**

- Solo puedes usar los módulos nativos que Expo Go incluye por defecto. Si tu app necesita acceso a la cámara con configuración personalizada, notificaciones push, biometría, Bluetooth o cualquier módulo nativo que no esté en Expo Go, simplemente no funcionará.
- No puedes modificar código nativo (archivos `.swift`, `.kt`, `AndroidManifest.xml`).
- La New Architecture en Expo Go está siempre activa independientemente de tu configuración, lo que puede causar incompatibilidades con algunas librerías.
- No se puede publicar en producción desde Expo Go.

### Qué es un Development Build

Un Development Build es un binario propio de tu app (un `.apk` para Android o un `.ipa` para iOS) generado con EAS Build (el servicio de compilación en la nube de Expo). Incluye exactamente los módulos nativos que tu proyecto necesita, ni más ni menos.

```
Expo Go:    [tu código JS] corre dentro de [app Expo precompilada]
Dev Build:  [tu código JS] corre dentro de [tu propia app compilada]
```

### Cuándo usar cada uno

| Situación | Herramienta |
|---|---|
| Aprender React Native, prototipos rápidos | Expo Go |
| Proyecto real sin módulos nativos custom | Expo Go (temporalmente) |
| Módulos nativos no incluidos en Expo Go | Development Build |
| Producción / publicar en stores | Development Build + EAS Build |
| Proyecto de empresa o cliente | Development Build siempre |

### En NoteFlow

Durante esta fase usamos Expo Go porque todas las librerías del stack (FlashList, Zustand, React Native Paper, AsyncStorage) están incluidas o son compatibles. Si en fases posteriores añadimos notificaciones push o acceso a la cámara para adjuntar imágenes a las notas, necesitaríamos migrar a un Development Build.

---

## 4. Sistemas de diseño — por qué React Native Paper

Se evaluaron las dos opciones más usadas en el ecosistema Expo:

**Gluestack UI** sigue una filosofía similar a Tailwind CSS: componentes sin estilos fuertes predefinidos que se personalizan mediante tokens. Ofrece máximo control visual pero requiere más trabajo inicial de configuración y diseño.

**React Native Paper** implementa Material Design 3, el sistema de diseño de Google. Viene con componentes completamente funcionales y visualmente coherentes desde el primer día: botones, tarjetas, inputs, chips, barras de progreso, FABs.

Se eligió **React Native Paper** para NoteFlow porque el objetivo de esta fase es aprender la arquitectura de React Native (navegación, estado, persistencia, rendimiento en listas), no el diseño de sistemas UI desde cero. Paper permite centrarse en lo que importa sin sacrificar calidad visual.