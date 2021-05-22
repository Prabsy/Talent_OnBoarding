using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Talent_Onboarding.Models
{
    public partial class Product
    {
        public Product()
        {
            Sales = new HashSet<Sales>();
        }

        public int Id { get; set; }
        [Required(ErrorMessage = "Product Name is required"), MaxLength(50, ErrorMessage = "Max Length Exceeded for Name")]

        public string Name { get; set; }
        [Range(1, 10000000, ErrorMessage = "Price must be between 1 and 10000000")]
        public double Price { get; set; }

        public virtual ICollection<Sales> Sales { get; set; }
    }
}
