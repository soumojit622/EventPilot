import { Calendar, Clock, Building2, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Calendar,
    number: "50,000+",
    label: "Events Organized",
    description: "Successfully planned and executed",
  },
  {
    icon: Clock,
    number: "10,000+",
    label: "Hours Saved",
    description: "Through automation and AI",
  },
  {
    icon: Building2,
    number: "200+",
    label: "Campuses",
    description: "Using EventPilot nationwide",
  },
  {
    icon: TrendingUp,
    number: "98%",
    label: "Satisfaction Rate",
    description: "From event organizers",
  },
];

const Stats = () => {
  return (
    <section className="container py-20">
      {/* Heading */}
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Making an Impact Across Campuses
        </h2>
        <p className="text-gray-400 text-lg">
          Thousands of organizers trust EventPilot to host seamless and successful events.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center rounded-xl p-6 bg-white/5 hover:bg-white/10 transition hover:shadow-lg"
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-600/20 mb-4">
                <Icon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-1">{stat.number}</h3>
              <p className="font-semibold text-lg text-foreground mb-1">{stat.label}</p>
              <p className="text-gray-400 text-sm">{stat.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;
