document.getElementById('newsletterForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const email = document.getElementById('newsletterEmail').value.trim();

  if (!email || !email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }

  alert('Thank you for subscribing!');
  this.reset();
});