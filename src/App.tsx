import * as React from "react"
import { Box, ChakraProvider, Code, Flex, Grid, Link, Spinner, theme, VStack } from "@chakra-ui/react"
import reducers from "./reducers"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

const RootApp = () => (
  <Flex align='stretch'>

  </Flex>
)

export const App = () => {
  const { store, persistor } = reducers();

  return <ChakraProvider theme={theme}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Spinner size='xl' />}>
        <RootApp />
      </PersistGate>
    </Provider>
  </ChakraProvider>
}