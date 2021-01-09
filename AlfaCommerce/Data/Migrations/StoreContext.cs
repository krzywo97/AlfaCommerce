using AlfaCommerce.Models;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace AlfaCommerce.Data.Migrations
{
    public partial class StoreContext : DbContext
    {
        public StoreContext()
        {
        }

        public StoreContext(DbContextOptions<StoreContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Color> Colors { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductCategory> ProductCategories { get; set; }
        public virtual DbSet<ProductPhoto> ProductPhotos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql("Name=ConnectionStrings.AlfaCommerceConnection");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Polish_Poland.1250");

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("categories");

                entity.HasIndex(e => e.ParentId, "IX_categories_parent_id");

                entity.HasIndex(e => e.Id, "categories_id_uindex")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.ParentId).HasColumnName("parent_id");

                entity.HasOne(d => d.Parent)
                    .WithMany(p => p.InverseParent)
                    .HasForeignKey(d => d.ParentId)
                    .HasConstraintName("categories_parent_id_fkey");
            });

            modelBuilder.Entity<Color>(entity =>
            {
                entity.ToTable("colors");

                entity.HasIndex(e => e.Id, "colors_id_uindex")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(30)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("products");

                entity.HasIndex(e => e.Color, "IX_products_color");

                entity.HasIndex(e => e.Id, "products_id_uindex")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Color).HasColumnName("color");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("name");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Weight).HasColumnName("weight");

                entity.HasOne(d => d.ColorNavigation)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.Color)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("products_colors_id_fk");
            });

            modelBuilder.Entity<ProductCategory>(entity =>
            {
                entity.HasKey(e => new { e.ProductId, e.CategoryId });

                entity.ToTable("product_categories");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.ProductsInCategory)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("product_categories_categories_id_fk");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductCategories)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("product_categories_products_id_fk");
            });

            modelBuilder.Entity<ProductPhoto>(entity =>
            {
                entity.ToTable("product_photos");

                entity.HasIndex(e => e.ProductId, "IX_product_photos_product_id");

                entity.HasIndex(e => e.Id, "product_photos_id_uindex")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasMaxLength(500)
                    .HasColumnName("url");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductPhotos)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("product_photos_products_id_fk");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
