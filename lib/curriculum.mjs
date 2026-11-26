export const courseMeta={
  "money": [
    "Business & money",
    "₹",
    "mint",
    "Build a shop budget",
    "Estimate costs, sales and cash before opening a pretend shop."
  ],
  "ai": [
    "Technology",
    "AI",
    "violet",
    "AI fact-check challenge",
    "Compare a generated claim with two independent credible sources."
  ],
  "science": [
    "Science & engineering",
    "∿",
    "blue",
    "Design a fair experiment",
    "Test two paper bridge designs under identical conditions."
  ],
  "web": [
    "Technology",
    "</>",
    "blue",
    "Build a useful web page",
    "Sketch an accessible task list and test its interactions."
  ],
  "algorithms": [
    "Technology",
    "↗",
    "violet",
    "Search smarter",
    "Compare linear and binary search by counting steps."
  ],
  "math": [
    "Math & reasoning",
    "π",
    "amber",
    "Plan a school event",
    "Compare unit prices, discounts and a realistic spending limit."
  ],
  "communication": [
    "Life skills",
    "Aa",
    "rose",
    "Pitch an idea",
    "Explain a problem, evidence and a proposed solution in one minute."
  ],
  "energy": [
    "Science & engineering",
    "☀",
    "mint",
    "Audit energy use",
    "Estimate energy usage from appliance ratings and hours."
  ],
  "design": [
    "Life skills",
    "◇",
    "rose",
    "Design for everyone",
    "Improve a school timetable using accessibility principles."
  ],
  "data": [
    "Math & reasoning",
    "▥",
    "amber",
    "Read a data story",
    "Compare counts and rates before drawing a conclusion."
  ]
};
export const expandedCourses=[
  {
    "id": "math",
    "title": "Math for real decisions",
    "description": "Use percentages, ratios and estimation in everyday life.",
    "lessons": [
      {
        "id": "unit",
        "title": "Compare unit prices",
        "text": "Divide total cost by quantity in the same unit. Lower unit cost is not always better if you cannot use the extra quantity.",
        "question": "Which is cheaper per notebook?",
        "options": [
          "5 for ₹100",
          "8 for ₹144",
          "Both equal"
        ],
        "answer": 1,
        "why": "₹144 ÷ 8 = ₹18, versus ₹20.",
        "example": "A 500 g pack costs ₹60; a 1 kg pack costs ₹110. Compare cost per kilogram.",
        "activity": "Compare two imaginary grocery packs without buying anything."
      },
      {
        "id": "percent",
        "title": "Understand discounts",
        "text": "A percentage is a fraction out of 100. Calculate the discount from the original price, then subtract it.",
        "question": "A ₹500 bag has 20% off. Final price?",
        "options": [
          "₹100",
          "₹400",
          "₹480"
        ],
        "answer": 1,
        "why": "20% of ₹500 is ₹100, so pay ₹400.",
        "example": "Two successive 10% discounts on ₹100 leave ₹81, not ₹80.",
        "activity": "Create a table of three prices and discounts; check each result."
      },
      {
        "id": "estimate",
        "title": "Estimate before calculating",
        "text": "Round numbers to get a quick sense of the answer. Use exact arithmetic for the final result and compare it to your estimate.",
        "question": "Which is closest to 49 × 21?",
        "options": [
          "100",
          "1,000",
          "10,000"
        ],
        "answer": 1,
        "why": "50 × 20 is about 1,000.",
        "example": "Estimate ₹198 + ₹303 as ₹500 before finding ₹501.",
        "activity": "Estimate a pretend school-event budget, then calculate it exactly."
      }
    ]
  },
  {
    "id": "communication",
    "title": "Communication and critical thinking",
    "description": "Explain ideas clearly and evaluate claims respectfully.",
    "lessons": [
      {
        "id": "claim",
        "title": "Claim, evidence, reasoning",
        "text": "A claim is what you believe. Evidence supports it; reasoning explains why the evidence matters. A confident opinion alone does not establish a fact.",
        "question": "Which best supports a claim?",
        "options": [
          "A relevant documented observation",
          "A loud voice",
          "A popular slogan"
        ],
        "answer": 0,
        "why": "Relevant evidence can be checked.",
        "example": "If you claim a route is shorter, measure both routes using the same units.",
        "activity": "Write one claim about a school improvement and identify evidence you would need."
      },
      {
        "id": "listen",
        "title": "Listen and clarify",
        "text": "Restate the other person's point fairly before replying. Ask a specific question to resolve uncertainty.",
        "question": "What helps resolve a misunderstanding?",
        "options": [
          "Interrupt immediately",
          "Ask what the person means",
          "Change the topic"
        ],
        "answer": 1,
        "why": "A clarifying question checks your interpretation.",
        "example": "Before rejecting an idea, say what you understood and ask whether it is correct.",
        "activity": "With a trusted adult, practice explaining two sides of a harmless topic."
      },
      {
        "id": "pitch",
        "title": "Explain an idea",
        "text": "A clear pitch states the problem, who faces it, a possible solution and how to test it. Avoid promises you cannot prove.",
        "question": "Which is a useful closing for a pitch?",
        "options": [
          "Everyone will buy this",
          "It is guaranteed",
          "We will test it with five consenting volunteers"
        ],
        "answer": 2,
        "why": "A testable next step is more useful than an unsupported promise.",
        "example": "A school library reminder could be tested by comparing returned books before and after a small trial.",
        "activity": "Prepare a one-minute pitch on paper. Do not collect personal details."
      }
    ]
  },
  {
    "id": "energy",
    "title": "Energy and sustainable living",
    "description": "Understand electricity use and make evidence-based comparisons.",
    "lessons": [
      {
        "id": "units",
        "title": "Power versus energy",
        "text": "Power is a rate in watts. Energy in kilowatt-hours equals power in kilowatts multiplied by time in hours.",
        "question": "A 100 W device runs for 10 hours. Energy?",
        "options": [
          "1 kWh",
          "10 kWh",
          "100 kWh"
        ],
        "answer": 0,
        "why": "0.1 kW × 10 h = 1 kWh.",
        "example": "A 60 W fan running 5 hours uses 0.3 kWh.",
        "activity": "Use appliance label values or hypothetical ratings; never open electrical equipment."
      },
      {
        "id": "compare",
        "title": "Compare scenarios",
        "text": "Compare energy over the same duration and conditions. Real electricity bills include tariffs and other charges, so energy alone does not determine the bill.",
        "question": "Which uses less energy over 5 hours?",
        "options": [
          "100 W device",
          "40 W device",
          "Both equal"
        ],
        "answer": 1,
        "why": "0.2 kWh is less than 0.5 kWh.",
        "example": "Compare a 10 W lamp and a 60 W lamp for three hours, assuming comparable task lighting.",
        "activity": "Make a simple energy table for a hypothetical room."
      },
      {
        "id": "system",
        "title": "Think in systems",
        "text": "A change can affect more than one outcome. Consider cost, reliability, safety and comfort rather than optimizing one number.",
        "question": "Which is a balanced energy decision?",
        "options": [
          "Turn off essential safety devices",
          "Ignore comfort",
          "Reduce unnecessary usage without compromising safety"
        ],
        "answer": 2,
        "why": "Energy savings should not create avoidable risks.",
        "example": "Switch off unused lights while keeping stairways safely lit.",
        "activity": "List three safe energy-saving habits; discuss any equipment changes with an adult."
      }
    ]
  },
  {
    "id": "design",
    "title": "Human-centred design",
    "description": "Understand needs, sketch solutions and test accessibility.",
    "lessons": [
      {
        "id": "needs",
        "title": "Discover the need",
        "text": "Start by observing a task and asking what makes it difficult. Do not assume every person has the same needs.",
        "question": "What should come before a solution?",
        "options": [
          "Understand the user's task",
          "Choose a fancy color",
          "Buy an expensive tool"
        ],
        "answer": 0,
        "why": "Understanding the task helps solve the right problem.",
        "example": "A timetable may be difficult to read because the text is tiny or contrast is weak.",
        "activity": "Sketch a timetable for a student who needs larger text."
      },
      {
        "id": "prototype",
        "title": "Prototype cheaply",
        "text": "A prototype is a quick representation used to learn. Paper sketches can reveal mistakes before software is built.",
        "question": "Why use a paper prototype?",
        "options": [
          "It guarantees success",
          "It makes early changes cheap",
          "It replaces all testing"
        ],
        "answer": 1,
        "why": "Changing a sketch is usually easier than rebuilding software.",
        "example": "Draw two versions of a school library sign and compare readability.",
        "activity": "Test your own two sketches using the same task."
      },
      {
        "id": "access",
        "title": "Accessibility is functional",
        "text": "Use readable text, sufficient contrast, labels and keyboard navigation. Never rely only on colour to convey an important status.",
        "question": "How should an error be shown?",
        "options": [
          "Only with red colour",
          "Only with an animation",
          "With clear text and a visible cue"
        ],
        "answer": 2,
        "why": "Text and a visible cue help more users understand the error.",
        "example": "A form can show 'Enter a valid number' next to the field.",
        "activity": "Review a mock form for labels, readable text and clear error states."
      }
    ]
  },
  {
    "id": "data",
    "title": "Data literacy and reasoning",
    "description": "Learn to question charts, averages and comparisons.",
    "lessons": [
      {
        "id": "rates",
        "title": "Counts versus rates",
        "text": "A rate divides a count by a relevant total. Comparisons between different group sizes often require rates.",
        "question": "Which has a higher success rate?",
        "options": [
          "10 of 20",
          "15 of 50",
          "Both equal"
        ],
        "answer": 0,
        "why": "50% is greater than 30%.",
        "example": "A larger group can have more successes but a lower success rate.",
        "activity": "Make two fictional groups and compare both count and percentage."
      },
      {
        "id": "average",
        "title": "Mean and median",
        "text": "The mean is the sum divided by the count; the median is the middle value after sorting. Extreme values can pull the mean.",
        "question": "Median of 2, 3, 4, 5, 100?",
        "options": [
          "22.8",
          "4",
          "100"
        ],
        "answer": 1,
        "why": "The third value in the sorted list is 4.",
        "example": "A very expensive item can raise the average price without changing the median much.",
        "activity": "Calculate the mean and median of two small made-up data sets."
      },
      {
        "id": "chart",
        "title": "Read charts carefully",
        "text": "Read the axis labels, units, scale and source. A truncated axis or unequal time intervals can change visual impressions.",
        "question": "What should you inspect before comparing bars?",
        "options": [
          "Only bar colour",
          "Only title font",
          "Axis scale and units"
        ],
        "answer": 2,
        "why": "The scale and units explain what the bar lengths represent.",
        "example": "A chart beginning at 90 rather than zero can exaggerate differences between 95 and 98.",
        "activity": "Sketch the same values using two scales and explain the difference."
      }
    ]
  }
];
