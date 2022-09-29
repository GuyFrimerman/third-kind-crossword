import { ChakraProvider, Flex, Heading, extendTheme } from "@chakra-ui/react"
import reducers from "./reducers"
import { Provider } from "react-redux"
import Info from "./Info"
import Board from "./Board"
import ChooseBoard from "./ChooseBoard"
import AllDefinitions from "./AllDefinitions"
import { PersistGate } from "redux-persist/integration/react"
import RandomDisplay from "./RandomDisplay"


const RootApp = () => (
  <Flex
    className="app"
    direction="column"
    alignItems="center"
    justify="start"
    m="auto"
  >
    <Heading
      fontSize={["2xl", "4xl"]}
      as="h1"
      textAlign="center"
      maxW="100%"
      dir="rtl"
    >
      תשבץ מהסוג השלישי
      <Info />
    </Heading>
    <Flex
      dir="rtl"
      direction="column"
      justify="space-between"
      alignContent="space-around"
      wrap="wrap"
      h={["85vh", "90vh"]}
      w="90vw"
      m="auto"
      mt="15"
    >
      <Board />
      <ChooseBoard />
      <AllDefinitions />
    </Flex>
  </Flex>
)

const globalTheme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: 'yellow.50',
        overscrollBehaviorY: 'contain'
      }
    }
  },
  direction: 'rtl'
})

const Loading = () => (
  <Flex
    m="auto"
    h="90vh"
    w="90vw"
    justify="center"
    align="center"
  >
    <RandomDisplay />
  </Flex>
)

export const App = () => {
  const { store, persistor } = reducers();

  return <ChakraProvider theme={globalTheme}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
      <RootApp />
      </PersistGate>
    </Provider>
  </ChakraProvider>
}