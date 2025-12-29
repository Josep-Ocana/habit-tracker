import AddHabitForm from "./components/AddHabitForm";
import Footer from "./components/Footer";
import HabitList from "./components/habitList";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow w-full md:w-4/5 lg:w-3/5 mx-auto p-5 space-y-10">
          <AddHabitForm />
          <HabitList />
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
