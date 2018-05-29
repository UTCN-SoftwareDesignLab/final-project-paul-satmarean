package library.entity;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

/**
 * Created by Paul on 27/05/2018.
 */
@Entity
@Table(name="book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title")
    private String title;

    @Column(name="quantity")
    private Integer quantity;

    @Column(name="available")
    private Integer available;

    @Column(name="description")
    private String description;

    @Column(name="picture")
    private String picture;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "author_has_book",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id")

    )
    @org.hibernate.annotations.ForeignKey(name = "none")
    private Set<Author> authors;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "genre_has_book",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")

    )
    @org.hibernate.annotations.ForeignKey(name = "none")
    private Set<Genre> genres;


    public Book() {
    }

    public Book(Long id, String title, Integer quantity, Integer available, String description, String picture, Set<Author> authors, Set<Genre> genres) {
        this.id = id;
        this.title = title;
        this.quantity = quantity;
        this.available = available;
        this.description = description;
        this.picture = picture;
        this.authors = authors;
        this.genres = genres;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getAvailable() {
        return available;
    }

    public void setAvailable(Integer available) {
        this.available = available;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }

    public Set<Genre> getGenres() {
        return genres;
    }

    public void setGenres(Set<Genre> genres) {
        this.genres = genres;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }
}
