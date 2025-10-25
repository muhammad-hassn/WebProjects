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
    public partial class Dashboard : Form
    {
        SqlConnection Con = new SqlConnection(@"Data Source=DESKTOP-6QEB6S6;Initial Catalog=CarRental;Persist Security Info=True;User ID=sa;Password=ker@4080");

        public Dashboard()
        {
            InitializeComponent();
        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void Dashboard_Load(object sender, EventArgs e)
        {
            string querycar = "Select count(*) from CarTbl";
            SqlDataAdapter sda = new SqlDataAdapter(querycar, Con);
            DataTable dt = new DataTable();
            sda.Fill(dt);
            carlbl.Text = dt.Rows[0][0].ToString();

            string querycust = "Select count(*) from CustomerTable";
            SqlDataAdapter sda1 = new SqlDataAdapter(querycust, Con);
            DataTable dt1 = new DataTable();
            sda.Fill(dt1);
            Custlabl.Text = dt1.Rows[0][0].ToString();

            string queryuser = "Select count(*) from UserTable";
            SqlDataAdapter sda2 = new SqlDataAdapter(queryuser, Con);
            DataTable dt2 = new DataTable();
            sda.Fill(dt2);
            userlabl.Text = dt1.Rows[0][0].ToString();
        }

        private void label2_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            // back button
            this.Hide();
            Mainfom m = new Mainfom();
            m.Show();
        }
    }
}
