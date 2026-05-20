export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  category: string;
  tags: string[];
  coverEmoji: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-split-expenses-on-a-group-trip',
    title: 'How to Split Expenses on a Group Trip (Without the Awkwardness)',
    excerpt:
      'Group trips are the best — until someone has to do the math. Here\'s a simple, fair system for splitting travel expenses so no one ends up paying more than they should.',
    publishedAt: '2025-03-10',
    updatedAt: '2025-03-10',
    readTime: 6,
    category: 'Travel',
    coverEmoji: '✈️',
    tags: ['group trip', 'travel expenses', 'expense splitting', 'UPI payments'],
    content: `
<h2>Why Group Trip Finances Get Complicated</h2>
<p>You book the hotel. Someone else pays for the cab. Another friend covers dinner. By the end of a five-day Goa trip, you have 40 different transactions across 8 people, and absolutely no idea who owes what.</p>
<p>This is the classic group trip money problem — and it ruins friendships if handled badly. The good news: with a simple system and the right tool, you can settle everything in under five minutes.</p>

<h2>The Golden Rule: One Person Tracks, Everyone Pays</h2>
<p>The biggest mistake groups make is trying to split every individual expense at the time it happens. Instead, use this system:</p>
<ol>
  <li><strong>Designate a group expense tracker</strong> (one shared group, not individual WhatsApp notes)</li>
  <li><strong>Anyone can pay</strong> for any expense — just log it immediately</li>
  <li><strong>Settle at the end</strong> with the minimum number of transfers</li>
</ol>
<p>This way, you're not doing math at the restaurant table or arguing over who venmo'd whom.</p>

<h2>How to Set Up a Group Expense Tracker in 2 Minutes</h2>
<p>Using SplitEase (free, no login needed):</p>
<ol>
  <li>Open <strong>SplitEase</strong> and tap <em>Create a Group</em></li>
  <li>Name it "Goa Trip 2025" and set category to Trip ✈️</li>
  <li>Add all travellers by name</li>
  <li>Share the group link with everyone — they can add expenses too</li>
</ol>
<p>Every time someone pays for something — the auto-rickshaw, the beach shack dinner, the hotel checkout — they add it to the group in 10 seconds.</p>

<h2>What Expenses to Track</h2>
<p>For a typical group trip, make sure to track:</p>
<ul>
  <li><strong>Transport</strong>: Flights, trains, cabs, auto-rickshaws, fuel if driving</li>
  <li><strong>Accommodation</strong>: Hotel, Airbnb, hostel — split per room or per night</li>
  <li><strong>Food</strong>: Restaurant bills, street food runs, groceries</li>
  <li><strong>Activities</strong>: Entry tickets, adventure sports, tours</li>
  <li><strong>Shopping</strong>: Group purchases like shared souvenirs</li>
</ul>
<p>Don't bother tracking personal spends — only things that the group shares.</p>

<h2>How the Smart Settlement Works</h2>
<p>At the end of the trip, SplitEase calculates the minimum number of payments to settle everything. Here's why this matters:</p>
<p>Say you have 6 people and 30 expenses. Naively, settling could take 30 bank transfers. SplitEase's algorithm compresses this to just 3–5 payments maximum — by finding people who can pay each other directly instead of routing money through intermediaries.</p>
<p>For example: if Rahul owes Priya ₹800 and Priya owes Ravi ₹800, instead of two transfers, SplitEase tells Rahul to pay Ravi directly — one transfer, done.</p>

<h2>Settle With UPI in One Tap</h2>
<p>Once balances are calculated, anyone with a UPI ID (GPay, PhonePe, Paytm) can share it in the group. SplitEase generates a direct UPI deep link with the exact amount pre-filled — tap it, confirm, done.</p>
<p>No more "I'll transfer you later" that never happens. Settle the morning of the last day while everyone is still together.</p>

<h2>Tips for a Smoother Trip</h2>
<ul>
  <li>Add expenses immediately, not at the end of the day — memories fade</li>
  <li>Designate one person to add the big shared expenses (hotel, flight)</li>
  <li>Use the "exact amounts" split type for unequal situations (e.g., some people didn't eat, one person booked a private room)</li>
  <li>Settle before everyone boards their flight home — not two weeks later over WhatsApp</li>
</ul>

<h2>Bottom Line</h2>
<p>Group trip expenses only become a problem if you don't track them. With a shared group on SplitEase and 10 seconds of logging per expense, you'll never end up doing mental math on a beach again.</p>
<p>Create your group now — it's free, instant, and no one needs to sign up.</p>
    `.trim(),
  },

  {
    slug: 'split-rent-with-roommates-guide',
    title: 'The Complete Guide to Splitting Rent and Bills with Roommates',
    excerpt:
      'Living with roommates is great for your wallet — until the rent conversation starts. Here\'s a fair, transparent system for splitting every shared expense without the monthly drama.',
    publishedAt: '2025-03-18',
    updatedAt: '2025-03-18',
    readTime: 7,
    category: 'Roommates',
    coverEmoji: '🏠',
    tags: ['roommate expenses', 'split rent', 'shared bills', 'utilities calculator'],
    content: `
<h2>The Roommate Money Problem</h2>
<p>Shared apartments save everyone money — but they create a monthly accounting headache. Who paid the electricity bill? Did we collect for groceries yet? Why is Ravi's share of the WiFi bill still pending from last month?</p>
<p>Money tension is the #1 reason good roommates fall out. The fix is surprisingly simple: a shared, transparent expense tracker that everyone can see.</p>

<h2>What to Split vs. What to Keep Personal</h2>
<p>First, agree on what's shared and what's personal. A standard roommate split usually includes:</p>
<p><strong>Split equally:</strong></p>
<ul>
  <li>Rent (unless rooms are different sizes)</li>
  <li>Internet / WiFi</li>
  <li>Shared streaming subscriptions (Netflix, Prime)</li>
  <li>Common area cleaning supplies</li>
  <li>Shared groceries (cooking oil, spices, basic staples)</li>
</ul>
<p><strong>Split by usage or keep personal:</strong></p>
<ul>
  <li>Electricity (if one person works from home and uses AC all day)</li>
  <li>Personal groceries</li>
  <li>Individual subscriptions</li>
</ul>
<p>Having this conversation upfront — before the first bill arrives — prevents 80% of future arguments.</p>

<h2>Setting Up a Shared Expense Group</h2>
<p>Create a permanent roommate group on SplitEase:</p>
<ol>
  <li>Go to SplitEase and create a group called "Flat 4B Expenses" (or whatever your flat is called)</li>
  <li>Add all roommates by name</li>
  <li>Share the group link — pin it in your flat WhatsApp group</li>
</ol>
<p>Now whenever anyone pays a shared bill, they log it in under 15 seconds. Every roommate can see the running balance at any time.</p>

<h2>How to Handle Recurring Bills</h2>
<p>Recurring bills (rent, WiFi, electricity) are the bulk of shared expenses. The easiest pattern:</p>
<ul>
  <li><strong>One person pays</strong> the bill to the landlord / utility company</li>
  <li>They add it to the group immediately</li>
  <li>Others settle their share by end of month</li>
</ul>
<p>Rotate who pays the big bills each month so the same person isn't always fronting money and chasing others.</p>

<h2>The "Running Tab" Approach</h2>
<p>Instead of settling after every single expense, do a monthly settlement. This is cleaner and avoids the constant back-and-forth of small transfers:</p>
<ol>
  <li>Everyone adds their shared payments throughout the month</li>
  <li>On the 1st of the month, check balances on SplitEase</li>
  <li>Make the minimum required transfers (usually 2–3 for a 4-person flat)</li>
  <li>Reset and start fresh</li>
</ol>
<p>SplitEase tells you exactly who pays whom and how much — so the settlement takes 5 minutes, not 45.</p>

<h2>Handling Unequal Situations Fairly</h2>
<p>Not everything is a simple equal split. Some common scenarios:</p>
<p><strong>Different room sizes:</strong> Split rent proportionally. If the master bedroom is 40% larger, the person in it pays 40% more rent. Use SplitEase's "percentage" split type.</p>
<p><strong>Someone's away for a week:</strong> They shouldn't pay for groceries they didn't use. Use the "exact amounts" split type to exclude them from those specific expenses.</p>
<p><strong>One person uses AC constantly:</strong> Split electricity by actual usage, not equally. Meter the AC separately or agree on a fixed extra charge.</p>

<h2>The UPI Settlement</h2>
<p>Every roommate should add their UPI ID to their profile in SplitEase. When settlement time comes, the app generates a direct payment link — tap it, pay, done. No "I'll transfer you tonight" that becomes next week.</p>

<h2>Setting Expectations Early</h2>
<p>The best roommate money system is one you agree on before moving in:</p>
<ul>
  <li>Which expenses are shared?</li>
  <li>When do we settle? (Weekly? Monthly?)</li>
  <li>What happens if someone can't pay on time?</li>
  <li>What's the process for adding new shared expenses?</li>
</ul>
<p>A 20-minute conversation upfront saves months of awkward WhatsApp messages.</p>

<h2>The Bottom Line</h2>
<p>Roommate finances are only stressful when they're opaque. A shared tracker that everyone can see — and a monthly settlement with UPI — makes it a non-issue. Start your roommate group on SplitEase today. It's free and takes 2 minutes.</p>
    `.trim(),
  },

  {
    slug: 'upi-payments-for-group-expenses',
    title: 'UPI for Group Expenses: Everything You Need to Know',
    excerpt:
      'UPI has changed how India pays — but most people still settle group expenses via cash or awkward bank transfers. Here\'s how to use UPI properly for group payments and debt settlement.',
    publishedAt: '2025-04-01',
    updatedAt: '2025-04-01',
    readTime: 5,
    category: 'Payments',
    coverEmoji: '💸',
    tags: ['UPI payments', 'GPay', 'PhonePe', 'group settlement', 'expense splitting India'],
    content: `
<h2>Why UPI is Perfect for Group Expense Settlement</h2>
<p>India's UPI infrastructure is world-class — instant transfers, zero fees, works 24/7. But most groups still handle expense settlement the old-fashioned way: cash, or "I'll transfer you later" (which often means never).</p>
<p>The missing piece is knowing who owes how much before the payment happens. That's where SplitEase comes in — calculate the balances, then settle with UPI in one tap.</p>

<h2>How UPI Group Settlement Works</h2>
<p>Here's the full flow:</p>
<ol>
  <li>Log all group expenses in SplitEase throughout your trip / event</li>
  <li>Open the Balances tab — see exactly who owes whom</li>
  <li>Tap "Settle Up" to see the suggested payment list</li>
  <li>Each payment card has a "Pay via UPI" button</li>
  <li>Tapping it opens your default UPI app (GPay, PhonePe, Paytm, BHIM) with the exact amount pre-filled</li>
  <li>Confirm the payment and mark it as paid in SplitEase</li>
</ol>
<p>The entire settlement for a 6-person group takes under 3 minutes.</p>

<h2>Setting Up UPI IDs in SplitEase</h2>
<p>For the UPI payment links to work, each member needs to add their UPI ID to their profile:</p>
<ol>
  <li>Go to the group → Settings tab</li>
  <li>Find your name and tap the UPI ID field</li>
  <li>Enter your UPI ID (e.g., <code>yourname@upi</code>, <code>9876543210@paytm</code>)</li>
  <li>SplitEase validates the format in real time</li>
  <li>Save the group</li>
</ol>
<p>Now when it's time to settle, anyone paying you will see a direct "Pay via UPI" button that opens their UPI app with your ID and the correct amount pre-filled.</p>

<h2>Which UPI Apps Work?</h2>
<p>SplitEase generates a standard <code>upi://pay</code> deep link which works with all major UPI apps:</p>
<ul>
  <li><strong>Google Pay</strong> (GPay)</li>
  <li><strong>PhonePe</strong></li>
  <li><strong>Paytm</strong></li>
  <li><strong>BHIM</strong></li>
  <li><strong>Amazon Pay</strong></li>
  <li><strong>Any bank's UPI app</strong> (SBI YONO, HDFC MobileBanking, etc.)</li>
</ul>

<h2>The QR Code Option</h2>
<p>If you're settling in person (e.g., last day of a trip, before leaving the restaurant), use the QR code option:</p>
<ul>
  <li>In the settlement screen, tap the QR button next to a payment</li>
  <li>A QR code appears with the UPI ID and amount pre-encoded</li>
  <li>The paying person scans it with their UPI app</li>
  <li>Done — no typing, no errors</li>
</ul>
<p>This is especially useful when you're in the same room and want to verify the payment was made immediately.</p>

<h2>What if Someone Doesn't Have a UPI ID?</h2>
<p>Everyone in India with a bank account has a UPI ID — they may just not know it. Here are common formats by app:</p>
<ul>
  <li><strong>Google Pay:</strong> <code>mobilenumber@okaxis</code>, <code>@okhdfcbank</code>, <code>@okicici</code></li>
  <li><strong>PhonePe:</strong> <code>mobilenumber@ybl</code></li>
  <li><strong>Paytm:</strong> <code>mobilenumber@paytm</code></li>
  <li><strong>BHIM:</strong> <code>mobilenumber@upi</code></li>
</ul>
<p>To find your UPI ID: open your UPI app → Profile / My Account → UPI ID.</p>

<h2>Smart Settlement: Fewer Transfers</h2>
<p>One of SplitEase's best features is minimizing the number of transfers needed. In a 6-person group with 20 expenses, naively you might need 15 transfers to settle. SplitEase's algorithm finds the minimum — usually just 4–5 transfers — so everyone makes fewer UPI payments.</p>

<h2>Safety Tips for UPI Group Payments</h2>
<ul>
  <li>Always verify the UPI ID before paying — a typo sends money to the wrong person</li>
  <li>Mark payments as "paid" in SplitEase immediately after transferring</li>
  <li>Take a screenshot of the UPI transaction ID as proof</li>
  <li>Never share your UPI PIN with anyone</li>
</ul>

<h2>The Bottom Line</h2>
<p>UPI + SplitEase = the cleanest way to handle group expenses in India. No cash, no IOUs, no awkward follow-ups. Set up your UPI ID in the group settings, calculate balances, and settle in minutes.</p>
    `.trim(),
  },

  {
    slug: 'how-to-split-wedding-expenses-in-india',
    title: 'How to Split Wedding Expenses Between Two Families in India',
    excerpt:
      'Indian weddings involve dozens of events, hundreds of guests, and costs shared across two families. Here\'s a practical, drama-free system for tracking and splitting every rupee.',
    publishedAt: '2025-04-08',
    updatedAt: '2025-04-08',
    readTime: 8,
    category: 'Wedding',
    coverEmoji: '💍',
    tags: ['wedding expenses', 'split wedding costs', 'Indian wedding budget', 'shaadi expenses'],
    content: `
<h2>Why Wedding Expense Splitting Is Uniquely Complex</h2>
<p>A typical Indian wedding involves multiple events across 3–5 days, guest lists of 200–500 people, vendors from catering to photography, and costs shared (in some agreed proportion) between the bride's and groom's families. Add in contributions from relatives, and you have a financial picture that can easily spiral into confusion.</p>
<p>The traditional approach — one family pays for everything and "sorts it out later" — almost always leads to someone feeling they paid more than their share. A transparent, logged system prevents this entirely.</p>

<h2>First: Have the Money Conversation Early</h2>
<p>The most important step happens before the wedding planning starts: agree on who pays for what. Common approaches in Indian weddings:</p>
<p><strong>Traditional split:</strong> Bride's family covers certain events (Mehendi, Haldi), groom's family covers others (Baraat, reception)</p>
<p><strong>Equal split:</strong> All costs divided 50/50 regardless of which family hosts which event</p>
<p><strong>Proportional split:</strong> Each family pays proportional to their guest count (if bride's side has 60% of guests, they pay 60%)</p>
<p><strong>Expense-by-expense:</strong> Track everything and split based on agreed percentages per category</p>
<p>Whichever model you choose, write it down. Vague agreements cause real arguments later.</p>

<h2>Create a Wedding Expense Group</h2>
<p>Set up a SplitEase group specifically for wedding expenses:</p>
<ol>
  <li>Create a group named "Sharma-Verma Wedding" (or your family names)</li>
  <li>Add key members from both families who will be paying expenses</li>
  <li>Add the wedding planner if they're managing payments</li>
  <li>Share the group link with all contributors</li>
</ol>
<p>You can create separate groups per event (Mehendi Group, Reception Group) or track everything in one group with expense categories. One group is usually simpler.</p>

<h2>Expenses to Track by Category</h2>

<h3>Venue & Logistics</h3>
<ul>
  <li>Banquet hall / farmhouse booking</li>
  <li>Mandap decoration and stage setup</li>
  <li>Tent, lighting, and A/V equipment</li>
  <li>Generator rental</li>
</ul>

<h3>Food & Catering</h3>
<ul>
  <li>Main catering (per-plate cost × guest count)</li>
  <li>Sweets and mithai for ceremonies</li>
  <li>Welcome drinks and beverages</li>
  <li>Late-night snacks, breakfast for family staying over</li>
</ul>

<h3>Decor & Flowers</h3>
<ul>
  <li>Floral arrangements for all events</li>
  <li>Mehendi decorations</li>
  <li>Entrance décor</li>
  <li>Guest table centerpieces</li>
</ul>

<h3>Photography & Entertainment</h3>
<ul>
  <li>Photographer + videographer package</li>
  <li>Drone footage</li>
  <li>DJ or live band</li>
  <li>Dhol players, nagin band for Baraat</li>
</ul>

<h3>Transport</h3>
<ul>
  <li>Baraat vehicles (horse, vintage car, etc.)</li>
  <li>Guest shuttle buses</li>
  <li>Airport pickups for outstation relatives</li>
</ul>

<h3>Attire & Jewelry</h3>
<ul>
  <li>Bridal lehenga and accessories</li>
  <li>Groom's sherwani</li>
  <li>Family outfits for ceremonies</li>
</ul>

<h2>Handling Relative Contributions</h2>
<p>In many Indian weddings, relatives contribute money directly to the family. The cleanest way to handle this:</p>
<ul>
  <li>Record contributions as negative expenses (income) in the group</li>
  <li>Or keep a separate spreadsheet for gifts/shagun and only track the family's net expenses in SplitEase</li>
</ul>
<p>The second approach is cleaner — it keeps business expenses separate from gifts.</p>

<h2>Using the Percentage Split Type</h2>
<p>If families agreed to a 60/40 split, use SplitEase's percentage split type for every expense:</p>
<ol>
  <li>Add the expense (e.g., "Catering — Reception, ₹2,40,000")</li>
  <li>Choose "Percentage" split type</li>
  <li>Set Bride's Family: 60%, Groom's Family: 40%</li>
  <li>Save</li>
</ol>
<p>The app tracks the running balance for each family automatically.</p>

<h2>Settling Up After the Wedding</h2>
<p>Don't try to settle mid-wedding — everyone is too busy. Schedule a settlement meeting 1–2 weeks after the wedding when all invoices are paid and receipts are collected.</p>
<ol>
  <li>Open SplitEase and review all logged expenses together</li>
  <li>Check that everything is captured (ask vendors for final invoices)</li>
  <li>Review the balance summary</li>
  <li>Transfer via UPI with transaction IDs as proof</li>
</ol>
<p>Having everything logged and visible prevents the post-wedding "we paid more" conversation from ever happening.</p>

<h2>Common Pitfalls to Avoid</h2>
<ul>
  <li><strong>Logging expenses late:</strong> Add expenses within 24 hours — details get fuzzy</li>
  <li><strong>Verbal agreements:</strong> Any change to the split arrangement should be confirmed in writing (WhatsApp message is fine)</li>
  <li><strong>Forgetting small expenses:</strong> Photocopies, printing invitations, pooja items — they add up</li>
  <li><strong>One person paying everything:</strong> Distribute payments so no one family is owed a huge amount</li>
</ul>

<h2>A Note on Gifts and Shagun</h2>
<p>Wedding gifts and shagun (cash gifts from relatives) are separate from expense splitting. These typically stay with the receiving family. If both families agreed to pool gifts for a specific purpose (honeymoon fund, home setup), track that separately.</p>

<h2>Bottom Line</h2>
<p>Indian weddings are beautiful and expensive. A transparent expense tracker — with everyone able to see every rupee spent — removes the financial stress and lets both families focus on celebrating. Start your wedding expense group on SplitEase today.</p>
    `.trim(),
  },

  {
    slug: '5-rules-for-fair-expense-splitting',
    title: '5 Rules for Fair Expense Splitting That Every Friend Group Needs',
    excerpt:
      'Money is the fastest way to ruin friendships — but it doesn\'t have to be. These 5 simple rules will make expense splitting fair, transparent, and drama-free in any group.',
    publishedAt: '2025-04-15',
    updatedAt: '2025-04-15',
    readTime: 5,
    category: 'Tips',
    coverEmoji: '⚖️',
    tags: ['expense splitting tips', 'fair splitting', 'group expenses', 'money and friends'],
    content: `
<h2>Why Expense Splitting Goes Wrong</h2>
<p>It's not about the money — it's about fairness and trust. When someone feels they paid more than their share, or that they're constantly chasing others for repayment, resentment builds. A few clear rules, agreed on upfront, prevent almost every money conflict in friend groups.</p>

<h2>Rule 1: Track Everything in Real Time</h2>
<p>The biggest mistake groups make is trying to remember who paid what at the end of an event. By then, you've forgotten the ₹400 auto-rickshaw, the shared water bottles, and the second round of chai.</p>
<p><strong>The rule:</strong> Log every shared expense within 5 minutes of paying. This sounds tedious but takes literally 15 seconds with a tool like SplitEase. The person who pays adds it immediately — amount, who paid, what it was for.</p>
<p>Real-time tracking also removes the awkward end-of-trip calculation session. Balances are always current and visible to everyone.</p>

<h2>Rule 2: Agree on What "Fair" Means Before You Start</h2>
<p>Fair doesn't always mean equal. Different situations call for different approaches:</p>
<ul>
  <li><strong>Equal split</strong> works when everyone is in similar financial situations and participated equally (shared Airbnb, group dinner where everyone had similar amounts)</li>
  <li><strong>Percentage split</strong> works when some people consume more (bigger room, more drinks, more food)</li>
  <li><strong>Exact amounts</strong> works when you need precision (one person is vegetarian and their food cost less, someone left early and didn't attend an event)</li>
</ul>
<p>Discuss this before the trip or dinner — not after the bill arrives. "We'll split equally on this trip" or "Let's split by what we actually ordered" — either is fine, as long as everyone agrees upfront.</p>

<h2>Rule 3: Never Let Debts Age More Than 2 Weeks</h2>
<p>Unpaid debts accumulate resentment at compound interest. The longer a debt sits unresolved, the more the person who paid starts feeling taken advantage of — even if the amount is small.</p>
<p><strong>The rule:</strong> Settle at the end of every trip, event, or at least monthly for ongoing shared situations (roommates). Use UPI so there's no "I'll give you cash later" delay.</p>
<p>A clear deadline (settle before we leave the hotel / settle on the 1st of each month) removes the awkwardness of asking someone to pay. It's just part of the system.</p>

<h2>Rule 4: The Person Who Pays Doesn't Chase — The System Does</h2>
<p>One of the most corrosive patterns in friend groups: one organized person tracks expenses and then has to individually remind everyone to pay. This person starts to feel like the group's accountant, and others feel nagged.</p>
<p><strong>The fix:</strong> Use a shared group that everyone can see. When everyone can see their own balance in real time — and everyone agreed to settle on a specific date — no one needs to chase anyone. The balance screen is the reminder.</p>
<p>This shifts responsibility from "one person reminding everyone" to "everyone is accountable to the system."</p>

<h2>Rule 5: Small Amounts Are Not Worth the Friendship</h2>
<p>If someone's balance is ₹50, let it go. If someone genuinely can't pay right now, give them grace. Money is a tool, not a scoreboard.</p>
<p>The goal of fair expense splitting is not perfect accounting — it's preventing major imbalances and maintaining trust. A system that tracks the big stuff (hotel, flights, big dinners) is infinitely better than no system at all, even if it doesn't capture every ₹20 auto-split.</p>
<p><strong>The exception:</strong> If the "small amount" is actually the result of someone consistently underpaying and relying on the group's politeness, that's a pattern worth addressing directly.</p>

<h2>Bonus Rule: Be Transparent, Not Suspicious</h2>
<p>The purpose of tracking expenses is transparency, not surveillance. When everyone can see every expense in a shared group, there's nothing to argue about. Nobody is secretly paying less — it's all there.</p>
<p>This openness actually builds trust. Groups that use shared trackers report fewer money arguments, not more — because there's no ambiguity to argue about.</p>

<h2>Putting It Into Practice</h2>
<p>Start your next trip, dinner, or shared living arrangement with these rules in place:</p>
<ol>
  <li>Create a SplitEase group before the event starts</li>
  <li>Agree on the split type (equal vs. exact vs. percentage)</li>
  <li>Everyone logs what they pay in real time</li>
  <li>Settle before the trip ends or on a fixed monthly date</li>
  <li>Use UPI for instant, verifiable payments</li>
</ol>
<p>Five rules. Five minutes of setup. Zero money drama. That's the deal.</p>
    `.trim(),
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map(p => p.slug);
}
