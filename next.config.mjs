export default {
  poweredByHeader:false,
  // Temporary redirects while the old curriculum and role workflows are being rebuilt.
  async redirects(){return [{"source":"/course/1","destination":"/course/ai","permanent":false},{"source":"/course/2","destination":"/course/web","permanent":false},{"source":"/course/3","destination":"/course/algorithms","permanent":false},{"source":"/course/1/learn","destination":"/course/ai","permanent":false},{"source":"/course/2/learn","destination":"/course/web","permanent":false},{"source":"/course/3/learn","destination":"/course/algorithms","permanent":false},{"source":"/course/:id/learn","destination":"/course/:id","permanent":false},{"source":"/GamifiedDashboard","destination":"/student","permanent":false},{"source":"/MentorDashboard","destination":"/legacy/mentor","permanent":false},{"source":"/AdminDashboard","destination":"/legacy/admin","permanent":false},{"source":"/parent-view","destination":"/legacy/parent","permanent":false},{"source":"/auth","destination":"/legacy/auth","permanent":false}];},
  async headers(){return [{source:"/:path*",headers:[
    {key:"X-Content-Type-Options",value:"nosniff"},
    {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
    {key:"X-Frame-Options",value:"DENY"},
    {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"}
  ]}]}
};