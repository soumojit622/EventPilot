import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Dean of Student Affairs",
      institution: "State University",
      content:
        "EventPilot transformed how we manage campus events. The AI conflict detection alone has saved us countless hours of coordination.",
    },
    {
      name: "Rahul Sharma",
      role: "President, Tech Club",
      institution: "Engineering College",
      content:
        "As a club president, I can finally focus on planning great events instead of wrestling with scheduling conflicts. Game changer!",
    },
    {
      name: "Prof. James Anderson",
      role: "Department Head",
      institution: "Liberal Arts College",
      content:
        "The automated reminders and centralized calendar have dramatically improved our event attendance and faculty coordination.",
    },
  ];

  const getInitials = (name: string) => {
    const words = name.split(" ");
    return words.length > 1
      ? words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase()
      : words[0][0].toUpperCase();
  };

  return (
    <section className="container py-20">
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">
          Trusted by Leading Institutions
        </h2>
        <p className="text-lg text-muted-foreground">
          See what event organizers are saying about EventPilot
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Card
            key={testimonial.name}
            className="border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <CardContent className="pt-6 relative">
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="h-16 w-16" />
              </div>

              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400" />
                ))}
              </div>

              <p className="mb-6 text-muted-foreground italic leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-primary/20 rounded-full">
                  <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                    {getInitials(testimonial.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.institution}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
