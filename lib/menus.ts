

export type SubChildren = {
  href: string;
  label: string;
  active: boolean;
  children?: SubChildren[];
};
export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus?: Submenu[];
  children?: SubChildren[];
};

export type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
  id: string;
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
  id: string;
};

export function getMenuList(pathname: string, t: any): Group[] {

  return [
    {
      groupLabel: t("menu"),
      id: "menu",
      menus: [
        {
          id: "dashboard",
          href: "/",
          label: t("dashboard"),
          active: pathname === "/",
          icon: "heroicons-outline:home",
          submenus: [],
        },
        {
          id: "patients",
          href: "/patients",
          label: "Patients",
          active: pathname.includes("/patients"),
          icon: "heroicons-outline:users",
          submenus: [],
        },
        {
          id: "claims",
          href: "/claims",
          label: "Claims",
          active: pathname.includes("/claims"),
          icon: "heroicons-outline:document-text",
          submenus: [],
        },
        {
          id: "queue",
          href: "/queue",
          label: "Queue",
          active: pathname.includes("/queue"),
          icon: "heroicons-outline:view-list",
          submenus: [],
        },
        {
          id: "batches",
          href: "/batches",
          label: "Batches",
          active: pathname.includes("/batches"),
          icon: "heroicons-outline:collection",
          submenus: [],
        },
        {
          id: "payments",
          href: "/payments",
          label: "Payments",
          active: pathname.includes("/payments"),
          icon: "heroicons-outline:currency-dollar",
          submenus: [
            {
              href: "/payments/era",
              label: "ERA",
              active: pathname === "/payments/era",
              icon: "heroicons-outline:document-report",
              children: [],
            },
            {
              href: "/payments/view-payments",
              label: "View Payments",
              active: pathname === "/payments/view-payments",
              icon: "heroicons-outline:cash",
              children: [],
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Management",
      id: "management",
      menus: [
        {
          id: "customer-settings",
          href: "/customer-settings",
          label: "Customer Settings",
          active: pathname.includes("/customer-settings"),
          icon: "heroicons-outline:cog",
          submenus: [
            {
              href: "/customer-settings/company",
              label: "Company",
              active: pathname === "/customer-settings/company",
              icon: "heroicons-outline:office-building",
              children: [],
            },
            {
              href: "/customer-settings/practice",
              label: "Practice",
              active: pathname === "/customer-settings/practice",
              icon: "heroicons-outline:briefcase",
              children: [],
            },
            {
              href: "/customer-settings/provider",
              label: "Provider",
              active: pathname === "/customer-settings/provider",
              icon: "heroicons-outline:user-group",
              children: [],
            },
            {
              href: "/customer-settings/facility",
              label: "Facility",
              active: pathname === "/customer-settings/facility",
              icon: "heroicons-outline:location-marker",
              children: [],
            },
            {
              href: "/customer-settings/insurance-list",
              label: "Insurance List",
              active: pathname === "/customer-settings/insurance-list",
              icon: "heroicons-outline:identification",
              children: [],
            },
            {
              href: "/customer-settings/codes",
              label: "Codes",
              active: pathname.includes("/customer-settings/codes"),
              icon: "heroicons-outline:code",
              children: [
                {
                  href: "/customer-settings/codes/icd",
                  label: "ICD Codes",
                  active: pathname === "/customer-settings/codes/icd",
                },
                {
                  href: "/customer-settings/codes/cpt",
                  label: "CPT Codes",
                  active: pathname === "/customer-settings/codes/cpt",
                },
                {
                  href: "/customer-settings/codes/revenue",
                  label: "Revenue Codes",
                  active: pathname === "/customer-settings/codes/revenue",
                },
                {
                  href: "/customer-settings/codes/fee-schedules",
                  label: "Fee Schedules",
                  active: pathname === "/customer-settings/codes/fee-schedules",
                },
                {
                  href: "/customer-settings/codes/charge-panel",
                  label: "Charge Panel",
                  active: pathname === "/customer-settings/codes/charge-panel",
                },
              ],
            },
          ],
        },
        {
          id: "administration",
          href: "/administration",
          label: "Administration",
          active: pathname.includes("/administration"),
          icon: "heroicons-outline:shield-check",
          submenus: [
            {
              href: "/administration/user-management",
              label: "User Management",
              active: pathname === "/administration/user-management",
              icon: "heroicons-outline:users",
              children: [],
            },
            {
              href: "/administration/role-setup",
              label: "Role Setup",
              active: pathname === "/administration/role-setup",
              icon: "heroicons-outline:lock-closed",
              children: [],
            },
          ],
        },
        {
          id: "reports",
          href: "/reports",
          label: "Reports",
          active: pathname.includes("/reports"),
          icon: "heroicons-outline:chart-bar",
          submenus: [],
        },
        {
          id: "settings",
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: "heroicons-outline:cog",
          submenus: [],
        },
      ]
    },
    {
      groupLabel: "Appointments",
      id: "appointments",
      menus: [
        {
          id: "appointments",
          href: "/appointments",
          label: "Appointments",
          active: pathname.includes("/appointments"),
          icon: "heroicons-outline:calendar",
          submenus: [
            {
              href: "/appointments/calendar",
              label: "Calendar",
              active: pathname === "/appointments/calendar",
              icon: "heroicons-outline:calendar",
              children: [],
            },
            {
              href: "/appointments/list",
              label: "Appointment List",
              active: pathname === "/appointments/list",
              icon: "heroicons-outline:clipboard-list",
              children: [],
            },
            {
              href: "/appointments/provider-slots",
              label: "Provider Slots",
              active: pathname === "/appointments/provider-slots",
              icon: "heroicons-outline:clock",
              children: [],
            },
            {
              href: "/appointments/provider-room",
              label: "Provider Room",
              active: pathname === "/appointments/provider-room",
              icon: "heroicons-outline:office-building",
              children: [],
            },
          ],
        },
      ],
    },


  ];
}

export function getHorizontalMenuList(pathname: string, t: any): Group[] {
  return [
    {
      groupLabel: t("menu"),
      id: "menu",
      menus: [
        {
          id: "dashboard",
          href: "/",
          label: t("dashboard"),
          active: pathname.includes("/"),
          icon: "heroicons-outline:home",
          submenus: [],
        },
        {
          id: "patients",
          href: "/patients",
          label: "Patients",
          active: pathname.includes("/patients"),
          icon: "heroicons-outline:users",
          submenus: [],
        },
        {
          id: "claims",
          href: "/claims",
          label: "Claims",
          active: pathname.includes("/claims"),
          icon: "heroicons-outline:document-text",
          submenus: [],
        },
        {
          id: "queue",
          href: "/queue",
          label: "Queue",
          active: pathname.includes("/queue"),
          icon: "heroicons-outline:view-list",
          submenus: [],
        },
        {
          id: "batches",
          href: "/batches",
          label: "Batches",
          active: pathname.includes("/batches"),
          icon: "heroicons-outline:collection",
          submenus: [],
        },
        {
          id: "payments",
          href: "/payments",
          label: "Payments",
          active: pathname.includes("/payments"),
          icon: "heroicons-outline:currency-dollar",
          submenus: [
            {
              href: "/payments/era",
              label: "ERA",
              active: pathname === "/payments/era",
              icon: "heroicons-outline:document-report",
              children: [],
            },
            {
              href: "/payments/view-payments",
              label: "View Payments",
              active: pathname === "/payments/view-payments",
              icon: "heroicons-outline:cash",
              children: [],
            },
          ],
        },
        {
          id: "customer-settings",
          href: "/customer-settings",
          label: "Customer Settings",
          active: pathname.includes("/customer-settings"),
          icon: "heroicons-outline:cog",
          submenus: [
            {
              href: "/customer-settings/company",
              label: "Company",
              active: pathname === "/customer-settings/company",
              icon: "heroicons-outline:office-building",
              children: [],
            },
            {
              href: "/customer-settings/practice",
              label: "Practice",
              active: pathname === "/customer-settings/practice",
              icon: "heroicons-outline:briefcase",
              children: [],
            },
            {
              href: "/customer-settings/provider",
              label: "Provider",
              active: pathname === "/customer-settings/provider",
              icon: "heroicons-outline:user-group",
              children: [],
            },
            {
              href: "/customer-settings/facility",
              label: "Facility",
              active: pathname === "/customer-settings/facility",
              icon: "heroicons-outline:location-marker",
              children: [],
            },
            {
              href: "/customer-settings/insurance-list",
              label: "Insurance List",
              active: pathname === "/customer-settings/insurance-list",
              icon: "heroicons-outline:identification",
              children: [],
            },
            {
              href: "/customer-settings/codes",
              label: "Codes",
              active: pathname.includes("/customer-settings/codes"),
              icon: "heroicons-outline:code",
              children: [
                {
                  href: "/customer-settings/codes/icd",
                  label: "ICD Codes",
                  active: pathname === "/customer-settings/codes/icd",
                },
                {
                  href: "/customer-settings/codes/cpt",
                  label: "CPT Codes",
                  active: pathname === "/customer-settings/codes/cpt",
                },
                {
                  href: "/customer-settings/codes/revenue",
                  label: "Revenue Codes",
                  active: pathname === "/customer-settings/codes/revenue",
                },
                {
                  href: "/customer-settings/codes/fee-schedules",
                  label: "Fee Schedules",
                  active: pathname === "/customer-settings/codes/fee-schedules",
                },
                {
                  href: "/customer-settings/codes/charge-panel",
                  label: "Charge Panel",
                  active: pathname === "/customer-settings/codes/charge-panel",
                },
              ],
            },
          ],
        },
        {
          id: "administration",
          href: "/administration",
          label: "Administration",
          active: pathname.includes("/administration"),
          icon: "heroicons-outline:shield-check",
          submenus: [
            {
              href: "/administration/user-management",
              label: "User Management",
              active: pathname === "/administration/user-management",
              icon: "heroicons-outline:users",
              children: [],
            },
            {
              href: "/administration/role-setup",
              label: "Role Setup",
              active: pathname === "/administration/role-setup",
              icon: "heroicons-outline:lock-closed",
              children: [],
            },
          ],
        },
        // {
        //   id: "reports",
        //   href: "/reports",
        //   label: "Reports",
        //   active: pathname.includes("/reports"),
        //   icon: "heroicons-outline:chart-bar",
        //   submenus: [],
        // },
        {
          id: "appointments",
          href: "/appointments",
          label: "Appointments",
          active: pathname.includes("/appointments"),
          icon: "heroicons-outline:calendar",
          submenus: [
            {
              href: "/appointments/calendar",
              label: "Calendar",
              active: pathname === "/appointments/calendar",
              icon: "heroicons-outline:calendar",
              children: [],
            },
            {
              href: "/appointments/list",
              label: "Appointment List",
              active: pathname === "/appointments/list",
              icon: "heroicons-outline:clipboard-list",
              children: [],
            },
            {
              href: "/appointments/provider-slots",
              label: "Provider Slots",
              active: pathname === "/appointments/provider-slots",
              icon: "heroicons-outline:clock",
              children: [],
            },
            {
              href: "/appointments/provider-room",
              label: "Provider Room",
              active: pathname === "/appointments/provider-room",
              icon: "heroicons-outline:office-building",
              children: [],
            },
          ],
        },
        {
          id: "settings",
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: "heroicons-outline:cog",
          submenus: [],
        },
      ],
    },
  ];
}