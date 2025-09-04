// Builder Pattern
class PizzaBuilder {
  constructor() {
    this.size = "Medium";
    this.toppings = [];
  }
  setSize(size) {
    this.size = size;
    return this;
  }
  addTopping(topping) {
    this.toppings.push(topping);
    return this;
  }
  build() {
    return new Pizza(this.size, this.toppings);
  }
}

class Pizza {
  constructor(size, toppings) {
    this.size = size;
    this.toppings = toppings;
  }
  getDescription() {
    return `Pizza Size: ${this.size}<br>
            Toppings: ${this.toppings.join(", ") || "None"}`;
  }
}

// Payment Factory
class PaymentFactory {
  static getPayment(method) {
    switch (method) {
      case "Card":
        return new CardPayment();
      case "UPI":
        return new UpiPayment();
      case "COD":
        return new CashPayment();
      default:
        return null;
    }
  }
}
class CardPayment {
  pay() {
    return "Paid via Credit/Debit Card 💳";
  }
}
class UpiPayment {
  pay() {
    return "Paid via UPI 📱";
  }
}
class CashPayment {
  pay() {
    return "Cash on Delivery 💵";
  }
}

// DOM Logic
document.querySelectorAll(".next-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const current = btn.closest(".step");
    current.classList.add("hidden");
    document.getElementById(btn.dataset.next).classList.remove("hidden");
  });
});

document.getElementById("placeOrderBtn").addEventListener("click", () => {
  const builder = new PizzaBuilder();

  // Size
  const size = document.getElementById("pizzaSize").value;
  builder.setSize(size);

  // Toppings
  document.querySelectorAll(".toppings input:checked").forEach((t) => {
    builder.addTopping(t.value);
  });

  const pizza = builder.build();

  // Payment
  const method = document.getElementById("paymentMethod").value;
  const payment = PaymentFactory.getPayment(method);

  // Summary
  document.getElementById("summaryDetails").innerHTML =
    pizza.getDescription() + "<br>" + payment.pay();

  // Final Pizza Image Logic
  const img = document.getElementById("finalPizzaImg");
  if (pizza.toppings.includes("Pepperoni")) {
    img.src = "images/pepperoni-pizza.png";
  } else if (pizza.toppings.includes("Paneer")) {
    img.src = "images/veg-pizza.png";
  } else if (
    pizza.toppings.includes("Olives") ||
    pizza.toppings.includes("Mushrooms")
  ) {
    img.src = "images/supreme-pizza.png";
  } else if (pizza.toppings.includes("Extra Cheese")) {
    img.src = "images/cheese-pizza.png";
  } else {
    img.src = "images/pizza-base.png";
  }

  document.getElementById("step4").classList.add("hidden");
  document.getElementById("orderSummary").classList.remove("hidden");
});
