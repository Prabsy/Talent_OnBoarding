using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Talent_Onboarding.Models
{
    public partial class Store
    {
        public Store()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        [Required(ErrorMessage = "Customer Name is required"), MaxLength(50, ErrorMessage = "Max Length Exceeded for Name")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Address is required"), MaxLength(100, ErrorMessage = "Max Length Exceeded for Address")]
        public string Address { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
