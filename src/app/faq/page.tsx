'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, HelpCircle, Plane, User, RefreshCw, Briefcase, Shield, 
  Phone, ChevronDown, Sparkles, MessageSquare, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoAlert from '@/components/PromoAlert';
import Ticker from '@/features/marketing/components/Ticker';
import dynamic from 'next/dynamic';
const TravelGptChat = dynamic(() => import('@/features/chat-ai/components/TravelGptChat'), { ssr: false });

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: React.ReactNode;
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [searchFocused, setSearchFocused] = useState(false);
  
  const faqs: FaqItem[] = [
    // --- Booking & Pricing ---
    {
      id: "price-increase",
      category: "booking-pricing",
      question: "Why did the price of my flight increase when I tried to book it?",
      answer: (
        <p className="leading-relaxed">
          Airfares can change minute by minute depending on demand and availability. Between the time of your flight search and the time of your original reservation, seat inventory in a given booking class (fare) may sell out. The available seats are subsequently sold at a greater price by the airlines. FLYEZ regularly monitors these changes and makes every attempt to keep inventory and fares as updated as possible in the listings.
        </p>
      )
    },
    {
      id: "price-match",
      category: "booking-pricing",
      question: "What exactly is the \"Price Match Challenge\"?",
      answer: (
        <div className="space-y-3">
          <p className="leading-relaxed">
            When you book with FLYEZ, we want you to be confident that you have found an excellent deal. As a result, if you find a lower price (including taxes and fees) for the same flight itinerary available for booking on a Major OTA Competitor's site on the same day of the booking up to 10 p.m., we will match that lower price by refunding the price difference, or you may cancel your reservation with us for a full refund.
          </p>
          <p className="leading-relaxed">
            The phrase <strong>"same itinerary"</strong> refers to the fact that all of the elements of each offer match, including the airline(s), flight number(s), route, date(s), number of people, and seat type.
          </p>
          <p className="leading-relaxed">
            <strong>"Offered and available for booking"</strong> indicates that the itinerary you discovered is live on a Major OTA Competitor's site and available to the general public at the particular time you contact us, as determined by our customer care representatives. Please see our Terms and Conditions section for additional details on the Price Match Challenge.
          </p>
        </div>
      )
    },
    {
      id: "sold-out",
      category: "booking-pricing",
      question: "What does the message \"Sold Out\" mean when the flight appears available on the FLYEZ website's flight listing page?",
      answer: (
        <p className="leading-relaxed">
          Airfares are constantly updated based on demand and availability. Between the time of your flight search and the time of your original reservation, seat inventory in a given booking class (fare) may sell out. The available seats are subsequently sold at a greater price by the airlines. FLYEZ regularly monitors these changes and makes every attempt to keep inventory and fares as updated as possible in the listings.
        </p>
      )
    },
    {
      id: "hold-reservation",
      category: "booking-pricing",
      question: "Can I hold a reservation?",
      answer: (
        <p className="leading-relaxed">
          We are unable to hold reservations or bookings due to airline limitations. Furthermore, in order to receive the discounted fare advertised on FLYEZ, you must purchase the ticket(s) immediately. Airfares are not guaranteed unless a ticket is purchased.
        </p>
      )
    },
    {
      id: "flight-quote",
      category: "booking-pricing",
      question: "Can you email me a flight quote?",
      answer: (
        <p className="leading-relaxed">
          As demand grows, planes fill up throughout the day, resulting in rapid swings in pricing. Fares are not confirmed until they are purchased. As a result, we are unable to provide fares quotes via email. You may contact our customer service team to learn more about the most recent fares.
        </p>
      )
    },
    {
      id: "taxes-included",
      category: "booking-pricing",
      question: "Are taxes included in the fares shown on your website?",
      answer: (
        <p className="leading-relaxed">
          According to the new standards, the majority of the flight fares advertised now include all taxes and airline fees linked with the ticket price. The ticket price includes the basic airfare as well as all relevant taxes and fees.
        </p>
      )
    },
    {
      id: "tickets-guaranteed",
      category: "booking-pricing",
      question: "Are the tickets guaranteed?",
      answer: (
        <p className="leading-relaxed">
          All fares are subject to change without notice and are not guaranteed until full payment is received and tickets are issued. If a technical problem results in an inaccurate fare being displayed on the website, we reserve the right to notify you of the correct fare within three business days of your booking. You have the option of accepting the new fare or cancelling your reservation. Please read the section Terms and Conditions Agreement for more information.
        </p>
      )
    },
    {
      id: "fare-types",
      category: "booking-pricing",
      question: "What are the differences between published, bargain, and exclusive fares?",
      answer: (
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Published Fares:</strong> The airline's standard fares that are available for purchase to the general public.</li>
          <li><strong>Bargain Fares:</strong> Discounted fares made available directly by the airline for quick purchase.</li>
          <li><strong>Exclusive Fares:</strong> Fares that have been exclusively negotiated with airlines by FLYEZ and are only accessible on our website.</li>
        </ul>
      )
    },
    {
      id: "exclusive-sold-out",
      category: "booking-pricing",
      question: "What happens when all \"Exclusive fares\" are sold out?",
      answer: (
        <p className="leading-relaxed">
          When "Exclusive Fares" are sold out, the ticket's price increases to the next highest fare level. If your trip dates are changeable, you can try entering new dates and searching for acceptable pricing again, since an "Exclusive Fare" for the same location but on a different date may still be available. If you are unable to locate such fares, please contact our Customer Support team.
        </p>
      )
    },
    {
      id: "exclusive-one-way",
      category: "booking-pricing",
      question: "What if the \"Exclusive Fares\" only apply to one-way flights?",
      answer: (
        <p className="leading-relaxed">
          When the "Exclusive Fares" in one direction are sold out, the ticket price will be raised to the next highest fare level. If your travel dates are variable, please try selecting new dates to explore unique rates that may be available for the same destination on a different day. If you are still unable to locate such fares, we recommend contacting our Customer Support staff for assistance.
        </p>
      )
    },
    {
      id: "military-discounts",
      category: "booking-pricing",
      question: "Do you provide military discounts?",
      answer: (
        <p className="leading-relaxed">
          FLYEZ provides a variety of special discounts and promotions, including military discounts. Because most airlines provide lower airfare for Military-ID cards or active duty people, you can choose these tickets to save money.
        </p>
      )
    },
    {
      id: "senior-discounts",
      category: "booking-pricing",
      question: "Do you provide senior citizen discounts?",
      answer: (
        <p className="leading-relaxed">
          Adults over the age of 65 may be eligible for senior citizen discounts, although this is dependent on the policies of the airlines. Many domestic airlines no longer provide a senior discount, and not all international carriers do. If a senior discount is available, it will be displayed when booking online.
        </p>
      )
    },
    {
      id: "consolidator-explain",
      category: "booking-pricing",
      question: "What exactly is a \"Consolidator Fare\"?",
      answer: (
        <p className="leading-relaxed">
          Consolidator fares are typically 20-50% less expensive than published fares, and they may be subject to comparable or additional limitations. Cancellations and changes are usually more restricted, so if you have your dates fixed, consolidator fares provide outstanding value. We also recommend purchasing travel insurance.
        </p>
      )
    },
    {
      id: "consolidator-available",
      category: "booking-pricing",
      question: "Are Consolidator Fares available at FLYEZ?",
      answer: (
        <p className="leading-relaxed">
          Yes, Consolidator fares are available on FLYEZ as "Exclusive Fares."
        </p>
      )
    },

    // --- Passenger & Special Requests ---
    {
      id: "meal-request",
      category: "passenger-special",
      question: "How can I make a special meal request for my flight?",
      answer: (
        <p className="leading-relaxed">
          Some airlines no longer provide or charge for in-flight meals. However, you have the option of requesting a special meal while purchasing tickets online, or by calling the airline directly. Requests for special meals must be asked at least 24 hours before the intended departure. These requests are at the airline's decision and are not guaranteed.
        </p>
      )
    },
    {
      id: "infant-booking",
      category: "passenger-special",
      question: "How can I book a flight ticket for an infant?",
      answer: (
        <p className="leading-relaxed">
          Infants under the age of 24 months traveling within the United States travel free as long as they are seated on the lap of an adult (over the age of 18). Only one infant per adult is permitted to travel as a lap child. In most cases, infants travelling abroad must pay a percentage of the adult fare plus taxes and carry a paper ticket, even if they are sitting on the adult's lap. Infant tickets are not available for purchase online. You may contact our customer service staff to reserve an infant ticket.
        </p>
      )
    },
    {
      id: "choose-seat",
      category: "passenger-special",
      question: "Can I choose my seat depending on my preferences? If so, how is it possible?",
      answer: (
        <p className="leading-relaxed">
          Yes, you can choose your favorite seat when making your reservation or by calling our customer service department for manual coordination.
        </p>
      )
    },
    {
      id: "unaccompanied-minor",
      category: "passenger-special",
      question: "Can I use FLYEZ to book an unaccompanied minor?",
      answer: (
        <p className="leading-relaxed">
          Although most airlines allow unaccompanied minors to travel on their flights, we recommend that you contact the airline directly before booking your ticket to confirm any rules, limitations, and prices surrounding unaccompanied minor travel. You can make a reservation by calling our customer service staff.
        </p>
      )
    },
    {
      id: "name-changes",
      category: "passenger-special",
      question: "Can I make changes to my name for reserving flights?",
      answer: (
        <p className="leading-relaxed">
          All reservations must be made using the precise and original name of the person travelling; no nicknames are permitted. The name specified at the time of reservation must match the name on the traveler's government issued identity or passport for both domestic and foreign travel. Due to Homeland Security regulations, airlines do not allow name changes. Please contact our Customer Support staff if there is a spelling problem in the name.
        </p>
      )
    },
    {
      id: "add-passengers",
      category: "passenger-special",
      question: "Is it possible to add more passengers to an existing booking?",
      answer: (
        <p className="leading-relaxed">
          The only way to add more passengers is to create a new reservation. FLYEZ does not guarantee the availability of the original fare or flight because fares are subject to change at any time.
        </p>
      )
    },
    {
      id: "pet-travel",
      category: "passenger-special",
      question: "Are there any restrictions on traveling with my pet?",
      answer: (
        <div className="space-y-3">
          <p className="leading-relaxed">
            If you are going to travel with your pet, please contact the airline directly for details. Here are general guidelines:
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li>There are restrictions on the size and quantity of pets allowed on each flight.</li>
            <li>Traveling with a pet (except a guide dog) requires special management by airline staff; thus, an additional carrier fee will apply.</li>
            <li>Your pet may travel in the baggage compartment of your aircraft; however, temperature limits apply.</li>
            <li>Shipping containers/cages must meet strict size, ventilation, strength, and sanitation guidelines.</li>
            <li>For flight travel, you must obtain a valid health certificate for your pet.</li>
          </ul>
        </div>
      )
    },
    {
      id: "ticket-age-differences",
      category: "passenger-special",
      question: "What is the price difference between an adult, a senior, and a child?",
      answer: (
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Adult:</strong> Passenger rates apply to ages 18 to 64.</li>
          <li><strong>Senior:</strong> Travelers aged 65 and up. Some flights may not have discounted senior fares.</li>
          <li><strong>Children:</strong> Travelers between ages 2 and 17. Most airlines charge full rates for children over 11.</li>
          <li><strong>Infants:</strong> Children younger than age 2. Can travel in laps (domestic is free, international has a fee).</li>
        </ul>
      )
    },

    // --- Changes & Cancellations ---
    {
      id: "itinerary-stopover",
      category: "changes-cancellations",
      question: "Can I reserve an itinerary that includes a stopover?",
      answer: (
        <p className="leading-relaxed">
          You certainly can. Many airlines allow for stopovers. Simply pick the "Multiple Cities" link on the "Flight Search" screen to begin booking your itinerary.
        </p>
      )
    },
    {
      id: "modify-reservation",
      category: "changes-cancellations",
      question: "How can I make modifications to an existing reservation?",
      answer: (
        <div className="space-y-3">
          <p className="leading-relaxed">
            Please contact our Customer Support staff if you need to make adjustments to an existing booking. Please keep in mind that airlines impose a separate price per ticket for any adjustments requested, which varies from flight to flight. Additional conditions:
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li>The same airline must be used each time.</li>
            <li>The name of the traveler cannot be changed.</li>
            <li>The initial reservation must be canceled prior to the scheduled departure date and time.</li>
            <li>Routing and date changes depend on airline policy and slot availability.</li>
          </ul>
        </div>
      )
    },
    {
      id: "change-costs",
      category: "changes-cancellations",
      question: "How much would it cost me to change my airline ticket?",
      answer: (
        <div className="space-y-3">
          <p className="leading-relaxed">
            While altering your ticket, you may be subject to the following penalties:
          </p>
          <ul className="space-y-2 list-disc pl-5">
            <li>The penalty fees levied by the airline.</li>
            <li>Additional fees incurred if the new ticket carries a higher fare.</li>
            <li>A FLYEZ agency service fee to apply the modifications on your behalf.</li>
          </ul>
        </div>
      )
    },
    {
      id: "no-seat-assignment",
      category: "changes-cancellations",
      question: "I have a verified reservation but no seat assignment. Does this imply I won't have a seat when I arrive at the airport?",
      answer: (
        <p className="leading-relaxed">
          Airlines do not pre-assign 100% of their aircraft seats. Along with Bulkhead and Emergency Exit row seating, seats are reserved for airline personnel and frequent flyer members. If you have a confirmed reservation but no seat assignment, arrive at the airport at least three hours before departure to receive a seat assignment from airport gate officials on a first-come, first-served basis.
        </p>
      )
    },
    {
      id: "lost-paper-ticket",
      category: "changes-cancellations",
      question: "What should I do if I misplace my paper ticket?",
      answer: (
        <p className="leading-relaxed">
          In most circumstances, airlines require you to purchase replacement tickets at the current fare. If you do not use your original tickets within a certain time frame (usually 6 to 12 months), you will be given a credit for the purchase price of the new tickets minus the application charge (usually $100 per traveler). Contact our Customer Support staff to file a lost ticket application.
        </p>
      )
    },
    {
      id: "itinerary-changes",
      category: "changes-cancellations",
      question: "Will I be issued new tickets for my flights if my itinerary changes?",
      answer: (
        <p className="leading-relaxed">
          FLYEZ makes every effort to notify you of flight changes by email or phone, but we are not always aware of sudden airline-initiated changes. We recommend reconfirming your itinerary directly with the airline at least 72 hours before departure. Acceptance of a schedule modification binds you to any future penalty clauses for voluntary changes.
        </p>
      )
    },
    {
      id: "cancel-refund",
      category: "changes-cancellations",
      question: "If I cancel my flight, will I get refunded?",
      answer: (
        <p className="leading-relaxed">
          The majority of reduced airline tickets are non-refundable. They are highly economical but also highly restrictive. If you cancel your flight, you will not receive a refund. Before booking, we strongly advise reading and agreeing to our Terms and Conditions, which detail the strict cancellation terms.
        </p>
      )
    },
    {
      id: "incorrect-confirmation-itinerary",
      category: "changes-cancellations",
      question: "My itinerary is incorrectly displayed on the flight confirmation page. What should I do?",
      answer: (
        <p className="leading-relaxed">
          If you discover that the dates or flight routes of your itinerary are incorrect on the confirmation page, please contact our Customer Support staff immediately.
        </p>
      )
    },
    {
      id: "pending-guarantee",
      category: "changes-cancellations",
      question: "What does the fact that the airline does not guarantee the booking indicated in the booking confirmation email mean?",
      answer: (
        <p className="leading-relaxed">
          If the email confirmation shows a pending status, it suggests that the airline has not yet confirmed the seat blocks. You will receive an email with the finalized, confirmed itinerary and e-ticket number after your credit card has been charged and tickets have been issued.
        </p>
      )
    },
    {
      id: "paper-ticket-delay",
      category: "changes-cancellations",
      question: "My confirmation said \"Paper Ticket,\" but I have yet to receive one. When will I get this?",
      answer: (
        <p className="leading-relaxed">
          After a successful reservation, paper tickets are mailed via secure courier within 2 to 3 business days. You will receive a courier tracking number for confirmation. If your departure date is approaching and you haven't received it, contact our support team.
        </p>
      )
    },
    {
      id: "ticket-delivery-type",
      category: "changes-cancellations",
      question: "I made an online reservation. How can I tell if this is a paper or electronic ticket?",
      answer: (
        <p className="leading-relaxed">
          You will be informed whether you will receive an e-ticket or a paper ticket during the reservation checkout process. If the type changes due to technical reasons, FLYEZ will notify you within 24 hours. Paper tickets are generally only required when booking multiple airlines with no interline ticketing agreements.
        </p>
      )
    },
    {
      id: "reconfirm-booking",
      category: "changes-cancellations",
      question: "When should I make a reservation confirmation?",
      answer: (
        <p className="leading-relaxed">
          Please call the airline at least 72 hours before your scheduled flight departure to reconfirm your reservation. You must also reconfirm your return flights within the same duration of time.
        </p>
      )
    },
    {
      id: "unused-tickets-value",
      category: "changes-cancellations",
      question: "Is there any value in my unused or partially used plane tickets?",
      answer: (
        <p className="leading-relaxed">
          Tickets that have been partially used have no remaining value. Unused tickets may sometimes be exchanged for a new ticket (according to the airline's rules and change penalties). However, if you are a "No Show" (missed flight without notification), your ticket becomes completely valueless.
        </p>
      )
    },
    {
      id: "schedule-change-causes",
      category: "changes-cancellations",
      question: "What could be causing the change in my flight schedule?",
      answer: (
        <p className="leading-relaxed">
          Minor modifications can occur due to aircraft updates, flight number changes, or slight arrival/departure adjustments. Major changes stem from terminating service route slots or severe weather events. Always reconfirm flight times 24 to 72 hours before departure.
        </p>
      )
    },
    {
      id: "itinerary-change-notified",
      category: "changes-cancellations",
      question: "Will I be contacted if I have a confirmed flight reservation and the airline changes my itinerary?",
      answer: (
        <p className="leading-relaxed">
          If there is a significant change in your itinerary (departure shifts of 11+ minutes earlier or 20+ minutes later), FLYEZ will contact you via email or phone. Minor time updates that do not impact connections will not be explicitly emailed.
        </p>
      )
    },
    {
      id: "pta-definition",
      category: "changes-cancellations",
      question: "What exactly is a Prepaid Ticket Advice (PTA), and how does it function?",
      answer: (
        <p className="leading-relaxed">
          Prepaid Ticket Advice is an electronic alert sent to the airline authorizing them to issue printed tickets at the airport ticket counter. This applies when paper tickets cannot be mailed in time or international rules prevent e-tickets. A $150 USD service fee applies to cover PTA coordination costs.
        </p>
      )
    },

    // --- Airport, Baggage & Docs ---
    {
      id: "credit-card-mismatch",
      category: "airport-baggage",
      question: "Why am I receiving an error message stating that my credit card information does not match what is on file with my credit card company?",
      answer: (
        <p className="leading-relaxed">
          The details you supplied, such as your name, credit card number, address, and zip code, must match those on your credit card statement. Please contact your credit card company to ensure the information you're entering matches what they have on file. You could also try booking your reservation with another payment card. Please contact our Customer Service team if you do not have another credit card. We accept all credit cards, including those issued outside the United States.
        </p>
      )
    },
    {
      id: "direct-reservation",
      category: "airport-baggage",
      question: "Can I make a reservation with FLYEZ directly?",
      answer: (
        <p className="leading-relaxed">
          Yes. To meet your travel needs, FLYEZ provides phone support 24 hours a day, seven days a week, and 365 days a year. Please contact our Customer Service department.
        </p>
      )
    },
    {
      id: "last-minute-travel",
      category: "airport-baggage",
      question: "Do you accept last-minute travel reservations?",
      answer: (
        <p className="leading-relaxed">
          Some bookings may take up to three business days to process, making it impossible to book last-minute flights online. You may, however, contact our Customer Support staff to arrange immediate ticketing.
        </p>
      )
    },
    {
      id: "multi-city-flights",
      category: "airport-baggage",
      question: "Can I make a reservation to fly into one city and return from another town?",
      answer: (
        <p className="leading-relaxed">
          If you are flying into one location and returning from another, a multi-city option may be offered. Please contact our customer service staff to inquire about its availability.
        </p>
      )
    },
    {
      id: "max-passengers",
      category: "airport-baggage",
      question: "What is the maximum number of travelers I may book online in a single reservation?",
      answer: (
        <p className="leading-relaxed">
          For online bookings, the limit is typically 9 passengers. To learn more about larger group bookings or discounted blocks, please contact our customer service team directly.
        </p>
      )
    },
    {
      id: "travel-e-ticket",
      category: "airport-baggage",
      question: "How do I use an E-Ticket (Electronic Ticket) to travel?",
      answer: (
        <p className="leading-relaxed">
          Most airlines now provide e-tickets, or electronic tickets, allowing you to travel without fear of losing or stealing your paper tickets. When traveling using e-tickets, however, make sure to bring government-issued photo identification (such as a passport or driver's license) to the airport. To travel through the security checkpoint, you must have your printed boarding pass up to 24 hours in advance. If you checked in online with your luggage or have e-tickets, you must travel to the ticket counter to get your boarding pass.
        </p>
      )
    },
    {
      id: "baggage-limits",
      category: "airport-baggage",
      question: "What are the baggage limitations for the flights I've booked?",
      answer: (
        <p className="leading-relaxed">
          Many airlines in the United States have modified their baggage allowances for both cabin/carry-on bags and check-in luggage. In addition, several airlines now charge a price for the second bag as well as the carry-on luggage. Please contact the airlines directly for the most up-to-date information on baggage limitations.
        </p>
      )
    },
    {
      id: "checked-luggage-transfer",
      category: "airport-baggage",
      question: "When I change planes, what happens to my checked-in luggage?",
      answer: (
        <p className="leading-relaxed">
          If you change planes and your airlines have a baggage interline agreement, your luggage will be checked all the way to your final destination. If no baggage agreement exists, it is your responsibility to claim your bags at the connecting airport's Baggage Claim and recheck them at the ticket counter of the next carrier.
        </p>
      )
    },
    {
      id: "baggage-agreement-check",
      category: "airport-baggage",
      question: "How can I find out if my airline has a baggage agreement?",
      answer: (
        <p className="leading-relaxed">
          Please check your email itinerary for luggage alerts. If you see an alert, it signifies that the airlines have no baggage agreement. Please contact the airline you are flying with to ensure whether your luggage will be checked to your final destination or if you will need to claim it while changing aircraft.
        </p>
      )
    },
    {
      id: "missed-flight",
      category: "airport-baggage",
      question: "What happens if I miss my flight?",
      answer: (
        <div className="space-y-3">
          <p className="leading-relaxed">
            If you miss your departing flight, the airline can designate your ticket as a <strong>"No Show"</strong> reservation. It indicates that your ticket has no value and cannot be altered or reimbursed, even if you pay a penalty. If you are on your way to the airport and believe you may miss your flight, call the airline immediately to prevent being a "No Show."
          </p>
          <p className="leading-relaxed">
            <strong>Important:</strong> If you miss any of your departing flights, all consequent flights in the same itinerary (including return flights) will also be canceled under the "No Show" policy.
          </p>
        </div>
      )
    },
    {
      id: "unable-to-fly",
      category: "airport-baggage",
      question: "What if I am unable to fly and do not appear at the airport? Is my ticket refundable or transferable?",
      answer: (
        <p className="leading-relaxed">
          If you are unable to travel, please contact the airline or us immediately. If you opt to just not show up, your reservation will be designated as a "No Show," and you will forfeit all ticket value.
        </p>
      )
    },
    {
      id: "travel-documentation",
      category: "airport-baggage",
      question: "What documentation is required for travel?",
      answer: (
        <p className="leading-relaxed">
          Documentation differs depending on your departure, destination, connection points, and passport nationality. Travelers must present appropriate identification, such as a passport or visa, at checkout. Carrying appropriate documentation is the passenger's exclusive responsibility, and neither FLYEZ nor the airline will be held liable if you fail to provide valid travel documents at the airport.
        </p>
      )
    },
    {
      id: "extra-fees-taxes",
      category: "airport-baggage",
      question: "Are there any other fees or taxes not included in the price of the flight(s)?",
      answer: (
        <p className="leading-relaxed">
          In addition to baggage costs, airport entry and exit fees are imposed by individual international airports and are not collected by the travel agent or the airline. Such fees are often collected during the immigration and customs process.
        </p>
      )
    },
    {
      id: "frequent-flyer-miles",
      category: "airport-baggage",
      question: "Is it possible to earn frequent flyer miles on these tickets?",
      answer: (
        <p className="leading-relaxed">
          Most of our discounted contract flights allow you to accumulate frequent flyer points, but some exclusions apply depending on the fare class.
        </p>
      )
    },
    {
      id: "frequent-flyer-miles-upgrade",
      category: "airport-baggage",
      question: "Can I use my frequent flyer miles to gain an upgrade or a better deal?",
      answer: (
        <p className="leading-relaxed">
          No, you cannot utilize frequent flyer miles to upgrade or receive a further discount on our specially discounted contract fares. Furthermore, frequent flyer miles must be redeemed directly with the airline or credit card provider with which you have an account.
        </p>
      )
    },
    {
      id: "discount-coupons",
      category: "airport-baggage",
      question: "Can I use my airline's discount coupon/voucher to purchase an airline ticket?",
      answer: (
        <p className="leading-relaxed">
          No, airline vouchers or discount coupons cannot be used to purchase airline tickets.
        </p>
      )
    },
    {
      id: "airport-security-docs",
      category: "airport-baggage",
      question: "What documentation will I need to bring with me to pass through airport security?",
      answer: (
        <p className="leading-relaxed">
          Domestic flights require your boarding pass, any government or state-issued picture ID, such as a driver's license or passport, and a copy of your itinerary/trip details. A valid passport is necessary for all types of flight travel outside the United States. In addition, several nations require a visa to enter. Please, contact our customer service team for further information on the required documents.
        </p>
      )
    },
    {
      id: "reconfirm-flight-needed",
      category: "airport-baggage",
      question: "Is it necessary for me to re-confirm my flight?",
      answer: (
        <p className="leading-relaxed">
          Yes. You should call the airline directly to re-confirm your domestic flight 24 hours in advance and your international journey 72 hours in advance. Check for any modifications in your itinerary's timetable. Airlines have the right to cancel reservations if they are not reconfirmed, whether or not tickets have been provided.
        </p>
      )
    },
    {
      id: "visa-one-way",
      category: "airport-baggage",
      question: "Do one-way travelers need a visa to visit abroad?",
      answer: (
        <p className="leading-relaxed">
          For entry with a one-way ticket, many nations demand specific paperwork and proof of onward travel. Passengers are responsible for obtaining all required entry paperwork prior to departure.
        </p>
      )
    },
    {
      id: "secure-flight-explain",
      category: "airport-baggage",
      question: "What exactly is Secure Flight?",
      answer: (
        <p className="leading-relaxed">
          The United States Department of Homeland Security (DHS) has introduced Secure Flight, a pre-screening program that streamlines the security watch list matching procedure. It gathers passenger data in order to improve the overall travel experience for all airline passengers.
        </p>
      )
    },
    {
      id: "secure-flight-data",
      category: "airport-baggage",
      question: "What kind of passenger data is needed for the Secure Flight Program?",
      answer: (
        <p className="leading-relaxed">
          When booking a flight, you will be asked to supply the following Secure Flight Passenger Data (SFPD): Full name as it appears on the government-issued ID with which you will be travelling, gender, redress number (if available), and date of birth.
        </p>
      )
    },
    {
      id: "secure-flight-goals",
      category: "airport-baggage",
      question: "What is the goal of the Secure Flight Program?",
      answer: (
        <ul className="space-y-2 list-disc pl-5">
          <li>Identify known and suspected terrorists</li>
          <li>Prevent those on the No Fly List from boarding an airplane.</li>
          <li>Subject persons on the Selectee List to additional screening to verify their eligibility to board.</li>
          <li>Protect passengers' privacy and facilitate passenger air travel.</li>
        </ul>
      )
    },
    {
      id: "redress-number",
      category: "airport-baggage",
      question: "What exactly is a Redress Number?",
      answer: (
        <p className="leading-relaxed">
          The Department of Homeland Security (DHS) assigns a Redress Number to a traveler who has previously been recognized for screening at airports to prevent misidentification. Visit <strong>www.dhs.gov/trip</strong> for additional information on the redress process.
        </p>
      )
    },
    {
      id: "boarding-pass-name-match",
      category: "airport-baggage",
      question: "Will I be permitted to fly if the name on my boarding pass does not match the name on my official ID?",
      answer: (
        <p className="leading-relaxed">
          Always double-check that the name you provide when booking matches the name on your government ID that you will use when traveling. Because boarding card systems differ, boarding passes may not always display the exact name you specified when making the reservation. However, deviations such as using a middle initial instead of a full middle name or not using a middle name/initial at all, hyphens, or apostrophes should not cause any issues for the passenger.
        </p>
      )
    },

    // --- General Queries ---
    {
      id: "travel-assistance",
      category: "general-queries",
      question: "When I'm traveling, who can I call for assistance?",
      answer: (
        <p className="leading-relaxed">
          Please contact the airline or service provider in the city/country where you are based as soon as you begin your travel, or call our 24/7 helpline at 1800-521-4263.
        </p>
      )
    },
    {
      id: "company-age",
      category: "general-queries",
      question: "How long has FLYEZ been in the travel industry?",
      answer: (
        <p className="leading-relaxed">
          FLYEZ has been in operation since 2016, delivering premium flight deals and exceptional travel desk services.
        </p>
      )
    },
    {
      id: "competitor-comparison",
      category: "general-queries",
      question: "How does FLYEZ compare to other online travel agencies?",
      answer: (
        <p className="leading-relaxed">
          FLYEZ guarantees lower rates and provides exclusive flight bargains. We are not linked with any particular airline or huge consortia, unlike many other Major Travel sites, and give an unbiased listing of fares.
        </p>
      )
    },
    {
      id: "trip-types-diff",
      category: "general-queries",
      question: "What is the main difference between a Round Trip, a One-way journey, and a multi-destination trip?",
      answer: (
        <ul className="space-y-2 list-disc pl-5">
          <li><strong>Round Trip:</strong> Flight travels from one area to another and then returns to the original.</li>
          <li><strong>One Way:</strong> Traveling from one area to another without returning to the first.</li>
          <li><strong>Multiple Destinations:</strong> Traveling to several cities, selecting flights between each of those locations.</li>
        </ul>
      )
    },
    {
      id: "service-classes",
      category: "general-queries",
      question: "What are the various service classes and flying options offered on the plane?",
      answer: (
        <div className="space-y-3">
          <ul className="space-y-2 list-disc pl-5">
            <li><strong>Coach/Economy Class:</strong> Seating in the main cabin area and is the most cost-effective.</li>
            <li><strong>Business Class:</strong> Wider seats that recline further, extra legroom, enhanced dining, and airport club access.</li>
            <li><strong>First Class:</strong> Located near the front, premium meals, first-class lounges, shorter check-in lines.</li>
          </ul>
          <p className="leading-relaxed">
            <strong>Flight Options:</strong> Nonstop flights (no landings before destination), Connecting flights (stops and changes planes), and Stops but no plane change (stops but passengers stay on board).
          </p>
        </div>
      )
    },
    {
      id: "terms-supplier-responsibility",
      category: "general-queries",
      question: "What are the terms and conditions associated with the ticket?",
      answer: (
        <div className="space-y-3">
          <p className="leading-relaxed">
            FLYEZ functions as a service consolidator, providing retail travel brokers with value-added services. We select suppliers with care to prevent default, but FLYEZ is not liable for any schedule changes, default, neglect, or non-performance by third-party suppliers (airlines, hotels, consolidators).
          </p>
          <p className="leading-relaxed">
            Discounts may vary depending on factors such as the airline used, the class of service, the destination, seasonal demands, and flight load.
          </p>
        </div>
      )
    }
  ];

  const categories = [
    { id: 'all', name: 'All FAQs', icon: <HelpCircle size={16} /> },
    { id: 'booking-pricing', name: 'Booking & Fares', icon: <Plane size={16} /> },
    { id: 'passenger-special', name: 'Passenger Requests', icon: <User size={16} /> },
    { id: 'changes-cancellations', name: 'Changes & Cancellations', icon: <RefreshCw size={16} /> },
    { id: 'airport-baggage', name: 'Airport & Baggage', icon: <Briefcase size={16} /> },
    { id: 'general-queries', name: 'General Queries', icon: <Shield size={16} /> },
  ];

  // Filtering Logic
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    if (expandedItem === id) {
      setExpandedItem(null);
    } else {
      setExpandedItem(id);
    }
  };

  // Auto-scroll logic for category selector on mobile
  const categoriesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (categoriesRef.current) {
      const container = categoriesRef.current;
      const activeEl = container.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-light dark:bg-brand-primary">
      {/* Sticky Header Bar (Promo Alert + Navigation) */}
      <div className="sticky top-0 z-[1000] flex flex-col">
        <PromoAlert />
        <Header />
        <Ticker />
      </div>

      {/* Hero Banner */}
      <section className="relative py-28 flex items-center justify-center text-center overflow-hidden bg-brand-primary">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1495147479427-18f4ad369290?q=80&w=1600&auto=format&fit=crop")'
          }}
        />
        <div 
          className="absolute inset-0 z-1" 
          style={{
            background: 'linear-gradient(to bottom, rgba(7, 14, 27, 0.25) 0%, rgba(7, 14, 27, 0.4) 50%, rgba(7, 14, 27, 0.75) 100%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_60%)] z-1" />
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,#ffffff_1px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none z-1" />

        <div className="premium-container relative z-10 w-full max-w-3xl">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-extrabold text-brand-orange uppercase tracking-widest inline-block mb-3.5"
            style={{ textShadow: '0 1px 2px rgba(7, 14, 27, 0.4)' }}
          >
            Your Queries, Our Answers
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold italic text-white leading-tight tracking-tight mb-8"
            style={{ textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)' }}
          >
            Frequently Asked <span className="text-brand-orange">Questions</span>
          </motion.h1>

          {/* Search bar inside glass container */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`relative flex items-center bg-white/10 dark:bg-white/5 backdrop-blur-xl border rounded-2xl p-2 shadow-2xl transition-all duration-300 ${
              searchFocused 
                ? 'border-brand-orange/50 shadow-[0_0_25px_rgba(255,92,0,0.25)] bg-white/15 dark:bg-white/10' 
                : 'border-white/20'
            }`}
          >
            <div className="pl-4 pr-2 text-white/60">
              <Search size={20} />
            </div>
            <input 
              type="text"
              placeholder="Search flights, seat changes, baggage, pets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="w-full py-3.5 bg-transparent border-0 text-white placeholder-white/50 focus:ring-0 focus:outline-none text-sm sm:text-base font-medium"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="px-4 text-xs font-bold text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                Clear
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main FAQ Content Section */}
      <main className="flex-1 py-16">
        <div className="premium-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Sidebar Category Selector (Desktop) */}
            <div className="hidden lg:block lg:col-span-4 sticky top-28 bg-white/80 dark:bg-brand-primary-light/40 backdrop-blur-xl border border-brand-border/60 dark:border-gray-800 p-6 rounded-3xl shadow-[0_20px_50px_rgba(7,14,27,0.03)] z-30">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-brand-border/60 dark:border-gray-800/60">
                <span className="text-[10px] font-extrabold uppercase text-brand-orange tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" /> Categories
                </span>
                <span className="text-[9px] font-bold text-brand-text-muted dark:text-gray-400 font-mono">
                  {categories.length - 1} sections
                </span>
              </div>

              <div className="relative flex flex-col gap-1.5">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setExpandedItem(null);
                      }}
                      className={`relative flex items-center gap-4 px-4 py-3 rounded-2xl text-left transition-all duration-300 group cursor-pointer w-full z-10 ${
                        isActive
                          ? 'text-brand-primary dark:text-white font-black'
                          : 'text-brand-text-muted hover:text-brand-primary dark:hover:text-white font-medium'
                      }`}
                    >
                      {/* Active Background Pill with Framer Motion layoutId */}
                      {isActive && (
                        <motion.div
                          layoutId="activeCategoryPill"
                          className="absolute inset-0 bg-slate-100 dark:bg-brand-primary border border-slate-200/50 dark:border-gray-800 rounded-2xl -z-10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          style={{
                            boxShadow: `0 8px 24px -6px rgba(7, 14, 27, 0.04)`
                          }}
                        />
                      )}

                      {/* Icon wrapper */}
                      <div 
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 z-10 transition-all duration-300 ${
                          isActive 
                            ? 'bg-brand-accent text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]' 
                            : 'bg-slate-50 dark:bg-brand-primary-light text-brand-text-muted group-hover:scale-105 group-hover:rotate-[6deg]'
                        }`}
                      >
                        {cat.icon}
                      </div>

                      {/* Title */}
                      <div className="flex-1 flex items-center justify-between z-10 group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-xs font-semibold tracking-tight">{cat.name}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sticky Mobile Categories Slider (Mobile) */}
            <div 
              ref={categoriesRef}
              className="lg:hidden w-full flex gap-2 overflow-x-auto pb-4 scrollbar-none sticky top-[77px] z-40 bg-brand-bg-light/95 dark:bg-brand-primary/95 backdrop-blur-md px-4 pt-2 -mx-4 border-b border-slate-200/50 dark:border-gray-800/60"
            >
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    data-active={isActive ? "true" : "false"}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setExpandedItem(null);
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-350 cursor-pointer border ${
                      isActive
                        ? 'bg-brand-accent text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] border-brand-accent'
                        : 'bg-white dark:bg-brand-primary-light/60 text-brand-text-muted border-slate-200/50 dark:border-gray-800'
                    }`}
                  >
                    <span className="shrink-0">{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Accordions Content Area (8 cols) */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 min-h-[600px]">
              
              {/* Active Search & Filter Indicators */}
              <div className="flex items-center justify-between border-b border-brand-border dark:border-gray-800 pb-3 mb-2">
                <span className="text-xs font-bold text-brand-text-muted dark:text-gray-400">
                  Showing {filteredFaqs.length} of {faqs.length} results
                </span>
                {searchQuery && (
                  <span className="text-[10px] bg-brand-orange/10 text-brand-orange border border-brand-orange/20 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={10} /> Search Matching
                  </span>
                )}
              </div>

              {/* No results state */}
              {filteredFaqs.length === 0 && (
                <div className="text-center py-16 bg-white dark:bg-brand-primary-light rounded-3xl border border-brand-border dark:border-gray-800/80 p-8 shadow-sm">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-gray-850 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-text-muted dark:text-gray-400">
                    <AlertCircle size={28} />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-brand-primary dark:text-white mb-2">
                    No FAQs Found
                  </h3>
                  <p className="text-brand-text-muted dark:text-gray-400 text-sm max-w-sm mx-auto">
                    We couldn't find any questions matching "{searchQuery}". Try using simpler keywords or browse through our categories.
                  </p>
                </div>
              )}

              {/* FAQ List Accordions */}
              <div className="flex flex-col gap-3.5">
                {filteredFaqs.map((faq) => {
                  const isExpanded = expandedItem === faq.id;
                  const catObj = categories.find(c => c.id === faq.category);
                  
                  return (
                    <div 
                      key={faq.id}
                      className={`group border transition-all duration-300 rounded-2xl overflow-hidden ${
                        isExpanded
                          ? 'bg-white dark:bg-brand-primary-light border-slate-300 dark:border-slate-700/80 shadow-[0_12px_24px_rgba(7,14,27,0.04)]'
                          : 'bg-white/60 dark:bg-brand-primary-light/40 border-brand-border dark:border-gray-800/60 hover:bg-white hover:border-slate-300 dark:hover:border-slate-800'
                      }`}
                    >
                      {/* Accordion Trigger */}
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full flex items-center justify-between text-left p-5 sm:p-6 cursor-pointer gap-4 relative"
                      >
                        <div className="flex-1">
                          {/* Mini Category tag */}
                          <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-brand-accent uppercase tracking-wider mb-2">
                            {catObj?.icon} {catObj?.name}
                          </span>
                          <h4 className="text-sm sm:text-base font-display font-semibold text-brand-primary dark:text-white tracking-tight leading-snug group-hover:text-brand-accent transition-colors duration-200">
                            {faq.question}
                          </h4>
                        </div>
                        <div 
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-slate-200 dark:border-gray-800 transition-all duration-350 ${
                            isExpanded ? 'bg-brand-accent border-brand-accent text-white rotate-180 shadow-md' : 'text-brand-text-muted group-hover:border-slate-300'
                          }`}
                        >
                          <ChevronDown size={16} />
                        </div>
                      </button>

                      {/* Accordion Body */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div className="px-5 pb-6 sm:px-6 sm:pb-7 border-t border-slate-100 dark:border-slate-800/60 pt-4 text-xs sm:text-sm text-brand-text-muted dark:text-gray-300 leading-relaxed font-medium">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Call Hotline & Live Chat Support Banner */}
              <div className="relative overflow-hidden bg-gradient-to-r from-brand-primary to-brand-primary-light dark:from-brand-primary-light dark:to-[#1e293b] rounded-3xl p-8 sm:p-10 border border-white/8 dark:border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-8">
                {/* Visual glow overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,92,0,0.1),transparent_60%)]" />
                
                <div className="flex items-center gap-4 z-10">
                  <div className="p-3.5 bg-white/10 rounded-2xl text-brand-orange shadow-[0_0_15px_rgba(255,92,0,0.25)] shrink-0">
                    <MessageSquare size={22} className="text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="text-white text-lg sm:text-xl font-display font-semibold tracking-tight mb-1">
                      Still Have Questions?
                    </h4>
                    <p className="text-white/70 text-xs sm:text-sm">
                      Our travel experts are available 24/7. Call us or start a chat with TravelGPT.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 z-10">
                  <button 
                    onClick={() => {
                      // Custom event to trigger TravelGPT opening if available
                      const chatIcon = document.querySelector('.chaticon-sty') as HTMLElement;
                      if (chatIcon) chatIcon.click();
                    }}
                    className="bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl text-center transition-all cursor-pointer"
                  >
                    Chat with TravelGPT
                  </button>
                  <a 
                    href="tel:1800-521-4263"
                    className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-extrabold px-6 py-3.5 rounded-xl text-center shadow-glow transition-all whitespace-nowrap"
                  >
                    Call Toll-Free 1800-521-4263
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

      <TravelGptChat />
      <Footer />
    </div>
  );
}
