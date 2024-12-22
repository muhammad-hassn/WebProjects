using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace CarRentalSystem
{
    public partial class Mainfom : Form
    {
        public Mainfom()
        {
            InitializeComponent();
        }

        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }
        
        private void label2_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Hide();
            Car car = new Car();
            car.Show();
        }

        private void button6_Click(object sender, EventArgs e)
        {
            this.Hide();
            Customer cus = new Customer();
            cus.Show();
        }

        private void button5_Click(object sender, EventArgs e)
        {
            this.Hide();
            Rental rent = new Rental();
            rent.Show();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            this.Hide();
            User usr = new User();
            usr.Show();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            this.Hide();
            Return rtn = new Return();
            rtn.Show();
        }

        private void Mainfom_Load(object sender, EventArgs e)
        {

        }

        private void button7_Click(object sender, EventArgs e)
        {
            this.Hide();
            Dashboard dsb = new Dashboard();
            dsb.Show();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Hide();
            Login log = new Login();
            log.Show();
        }
    }
}