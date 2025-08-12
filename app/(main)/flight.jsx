import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  List,
  Modal,
  Provider as PaperProvider,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import tw from "twrnc";
import { airports } from "../utils/airport";

export default function FlightSearch() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [days, setDays] = useState("7");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [visible, setVisible] = useState(false);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const getLocalSuggestions = (query) => {
    if (query.length < 2) return [];
    return airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(query.toLowerCase()) ||
        airport.code.toLowerCase().includes(query.toLowerCase())
    );
  };
  useEffect(() => {
    console.log(apiUrl);
  }, [])

  const handleFromChange = (text) => {
    setFrom(text);
    setFromSuggestions(getLocalSuggestions(text));
  };

  const handleToChange = (text) => {
    setTo(text);
    setToSuggestions(getLocalSuggestions(text));
  };

  const searchFlights = async () => {
    setLoading(true);
    setResults([]);

    try {
      const res = await fetch(`${apiUrl}/flightroutes/flightinfo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from, to, days }),
      });

      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      } else {
        alert(data.message || "Error fetching flights");
      }
    } catch (err) {
      // console.error(err);
      alert("Failed to fetch flights");
    }

    setLoading(false);
  };


  const renderSuggestion = (item, setter, clear) => (
    <List.Item
      key={item.code}
      title={`${item.name} (${item.code})`}
      onPress={() => {
        setter(item.code);
        clear([]);
      }}
    />
  );

  const showModal = (item) => {
    setSelectedFlight(item);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setSelectedFlight(null);
  };

  useEffect(() => {
    const loadSaved = async () => {
      const todayKey = new Date().toISOString().split("T")[0];
      const key = `flight-${from}-${to}-${todayKey}`;
      const saved = await AsyncStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.data?.length > 0) {
          setResults(parsed.data);
        }
      }
    };
    if (from && to) loadSaved();
  }, [from, to]);

  return (
    <PaperProvider>
      <KeyboardAvoidingView
        style={tw`flex-1 bg-white p-4`}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView>
          <TextInput
            label="From"
            value={from}
            onChangeText={handleFromChange}
            style={tw`mb-2`}
          />
          {fromSuggestions.map((item) =>
            renderSuggestion(item, setFrom, setFromSuggestions)
          )}

          <TextInput
            label="To"
            value={to}
            onChangeText={handleToChange}
            style={tw`mb-2`}
          />
          {toSuggestions.map((item) =>
            renderSuggestion(item, setTo, setToSuggestions)
          )}

          <TextInput
            label="Trip Duration (days)"
            value={days}
            onChangeText={setDays}
            keyboardType="numeric"
            style={tw`mb-4`}
          />

          <Button
            mode="contained"
            onPress={searchFlights}
            style={tw`mb-4 bg-blue-600`}
          >
            Search Cheapest Combos
          </Button>

          {loading && <ActivityIndicator animating={true} color="blue" />}

          {results.length > 0 && (
            <>
              <Text variant="titleMedium" style={tw`mt-4 mb-2`}>
                Cheapest Flight Combos
              </Text>
              <FlatList
                data={results}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => (
                  <List.Item
                    title={`₹${item.totalPrice.toFixed(0)} | ${item.departureDate} → ${item.returnDate}`}
                    description={`Go: ${item.depart.airline} → Back: ${item.return.airline}`}
                    left={() => <List.Icon icon="airplane" />}
                    onPress={() => showModal(item)}
                  />
                )}
              />
            </>
          )}
        </ScrollView>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={tw`bg-white m-4 p-4 rounded-xl`}
          >
            {selectedFlight && (
              <>
                <Text style={tw`text-lg font-bold mb-2`}>Trip Details</Text>
                <Text>Departure: {selectedFlight.departureDate}</Text>
                <Text>Return: {selectedFlight.returnDate}</Text>

                <Text style={tw`mt-2 font-bold`}>Outbound</Text>
                <Text>
                  {selectedFlight.depart.airline} |{" "}
                  {selectedFlight.depart.departure} →{" "}
                  {selectedFlight.depart.arrival}
                </Text>
                <Text>
                  {selectedFlight.depart.departureTime} →{" "}
                  {selectedFlight.depart.arrivalTime}
                </Text>

                <Text style={tw`mt-2 font-bold`}>Return</Text>
                <Text>
                  {selectedFlight.return.airline} |{" "}
                  {selectedFlight.return.departure} →{" "}
                  {selectedFlight.return.arrival}
                </Text>
                <Text>
                  {selectedFlight.return.departureTime} →{" "}
                  {selectedFlight.return.arrivalTime}
                </Text>

                <Text style={tw`mt-4 text-blue-600 font-bold`}>
                  Total: ₹{selectedFlight.totalPrice}
                </Text>

                <Button mode="contained" onPress={hideModal} style={tw`mt-4`}>
                  Close
                </Button>
              </>
            )}
          </Modal>
        </Portal>
      </KeyboardAvoidingView>
    </PaperProvider>
  );
}
