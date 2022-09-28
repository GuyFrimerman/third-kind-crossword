import { Box, ChakraProvider, Flex, Heading, extendTheme } from "@chakra-ui/react"
import reducers, { useAppDispatch } from "./reducers"
import { Provider } from "react-redux"
import { setCube } from "./reducers/board"
import Info from "./Info"
import { IndexedLegalCell } from "./data"
import Board from "./Board"
import ChooseBoard from "./ChooseBoard"
import AllDefinitions from "./AllDefinitions"
import { PersistGate } from "redux-persist/integration/react"
import RandomDisplay from "./RandomDisplay"

const RootApp = () => {
  const dispatch = useAppDispatch();

  return (
    <Flex
      className="app"
      id="root"
      direction="column"
      maxW="100vw"
      justify="stretch"
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
        id="bigContainer"
        dir="rtl"
        direction="row"
        justify="start"
        align="top"
        wrap="wrap"
        mt="15"
        h="90vh"
      >
        <Box minW={["80vw", "45vw"]} mx="10">
          <Board setCube={(v: IndexedLegalCell) => dispatch(setCube(v))} />
          <ChooseBoard />
        </Box>
        <AllDefinitions />
      </Flex>
    </Flex>
  )
}

const globalTheme = extendTheme({
  styles: {
    global: {
      body: {
        bgColor: 'yellow.50'
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