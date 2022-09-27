import * as React from "react"
import { Box, ChakraProvider, Code, Flex, Grid, Heading, Link, Spinner, theme, VStack } from "@chakra-ui/react"
import reducers, { useAppDispatch, useBoard } from "./reducers"
import { Provider, useSelector } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { setCube } from "./reducers/board"
import Info from "./Info"
import { IndexedLegalCell } from "./data"
import Board from "./Board"

const RootApp = () => {
  const {
    plane,
    board: currentBoard
  } = useSelector(useBoard);
  const indices = currentBoard.map(({ index }) => index);
  const dispatch = useAppDispatch();

  return (
    <Flex
      w="100vw"
      className="app"
      id="root"
      direction="column"
      align="stretch"
    >
      <Heading
        fontSize="4xl"
        as="h1"
        textAlign="center"
        dir="rtl"
      >
        תשבץ מהסוג השלישי
        <Info />
      </Heading>
      <Flex
        direction="row-reverse"
        justify="space-evenly"
        flex="1"
        maxH="90vh"
      >
        <Flex
        align= "stretch"
        flex= "1"
        padding= "10"
        direction= "column"
        maxW= "45vw"
        mx= "10"
        >
          <Board currentBoard={currentBoard} setCube={(v: IndexedLegalCell) => dispatch(setCube(v))} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export const App = () => {
  const { store, persistor } = reducers();

  return <ChakraProvider theme={theme}>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={<Spinner size='xl' />}> */}
        <RootApp />
      {/* </PersistGate> */}
    </Provider>
  </ChakraProvider>
}