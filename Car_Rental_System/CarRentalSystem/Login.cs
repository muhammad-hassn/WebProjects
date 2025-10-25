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
    public partial class Login : Form
    {
        public Login()
        {
            InitializeComponent();
        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void label6_Click(object sender, EventArgs e)
        {
            Uname.Text = "";
            password.Text = "";
        }
        SqlConnection Con = new SqlConnection(@"Data Source=DESKTOP-6QEB6S6;Initial Catalog=CarRental;Persist Security Info=True;User ID=sa;Password=ker@4080");

        private void button1_Click(object sender, EventArgs e)
        {
            string query = "Select count(*) from UserTable where UserName = '"+ Uname.Text + "' and password = '"+ password.Text+"';";
            Con.Open();
            SqlDataAdapter sda = new SqlDataAdapter(query, Con);
            DataTable dt = new DataTable();
            sda.Fill(dt);
            if (dt.Rows[0][0].ToString() == "1")
            {
                
                this.Hide();
                Mainfom m = new Mainfom();
                m.Show();
            }
            else
            {
                MessageBox.Show("WRONG USER NAME AND PASSWORD");
            }
            Con.Close();
        }
    }
}
