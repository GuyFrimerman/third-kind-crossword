import { Box, ChakraProvider, Flex, Heading, Spinner, extendTheme } from "@chakra-ui/react"
import reducers, { useAppDispatch, useBoard } from "./reducers"
import { Provider, useSelector } from "react-redux"
import { setCube } from "./reducers/board"
import Info from "./Info"
import { IndexedLegalCell } from "./data"
import Board from "./Board"
import ChooseBoard from "./ChooseBoard"
import AllDefinitions from "./AllDefinitions"
import { PersistGate } from "redux-persist/integration/react"

const RootApp = () => {
  const {
    plane,
    board: currentBoard
  } = useSelector(useBoard);
  const indices = currentBoard.map(({ index }) => index);
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
          <Board currentBoard={currentBoard} setCube={(v: IndexedLegalCell) => dispatch(setCube(v))} />
          <ChooseBoard />
        </Box>
        <AllDefinitions indices={indices} plane={plane} />
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

export const App = () => {
  const { store, persistor } = reducers();

  return <ChakraProvider theme={globalTheme}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spinner size='xl' />}>
        <RootApp />
      </PersistGate>
    </Provider>
  </ChakraProvider>
}